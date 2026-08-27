(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  root.SarmfCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const SWC107 = "SWC-107";
  const SUPPORTED_PATTERN = /^\s*([A-Za-z_$][\w$]*(?:\[[^\]]+\])?)\s*([-+]?=)\s*([^;]+);\s*$/;

  function lineNumber(source, offset) {
    return source.slice(0, offset).split("\n").length;
  }

  function findFunctions(source) {
    const results = [];
    const functionPattern = /function\s+([A-Za-z_$][\w$]*)\s*\([^)]*\)[^{;]*\{/g;
    let match;
    while ((match = functionPattern.exec(source))) {
      const open = source.indexOf("{", match.index);
      let depth = 1;
      let cursor = open + 1;
      let quote = null;
      while (cursor < source.length && depth > 0) {
        const char = source[cursor];
        const prev = source[cursor - 1];
        if (quote) {
          if (char === quote && prev !== "\\") quote = null;
        } else if (char === '"' || char === "'") quote = char;
        else if (char === "{") depth += 1;
        else if (char === "}") depth -= 1;
        cursor += 1;
      }
      if (depth === 0) results.push({ name: match[1], start: match.index, open, end: cursor });
    }
    return results;
  }

  function statementsInFunction(source, fn) {
    const body = source.slice(fn.open + 1, fn.end - 1);
    const base = fn.open + 1;
    const statements = [];
    let start = 0;
    let paren = 0;
    for (let i = 0; i < body.length; i += 1) {
      const char = body[i];
      if (char === "(") paren += 1;
      if (char === ")") paren -= 1;
      if (char === ";" && paren === 0) {
        const raw = body.slice(start, i + 1);
        const leading = raw.search(/\S/);
        if (leading >= 0) {
          const from = base + start + leading;
          statements.push({ text: raw.slice(leading).trim(), start: from, end: base + i + 1 });
        }
        start = i + 1;
      }
    }
    return statements;
  }

  function isExternalValueCall(text) {
    return /\.call\s*\{\s*value\s*:/.test(text) || /\.call\.value\s*\(/.test(text);
  }

  function stateEffect(text) {
    const match = text.match(SUPPORTED_PATTERN);
    if (!match) return null;
    const target = match[1];
    if (!/\[[^\]]+\]/.test(target) && !/^(balance|balances|credit|credits|shares|deposits|locked)/i.test(target)) return null;
    return { target, operator: match[2], expression: match[3].trim() };
  }

  function analyze(source) {
    if (typeof source !== "string" || !source.trim()) throw new Error("A Solidity contract is required.");
    const findings = [];
    findFunctions(source).forEach((fn) => {
      const statements = statementsInFunction(source, fn);
      statements.forEach((statement, index) => {
        if (!isExternalValueCall(statement.text)) return;
        const laterEffects = statements.slice(index + 1).map((s) => ({ statement: s, effect: stateEffect(s.text) })).filter((x) => x.effect);
        if (!laterEffects.length) return;
        const effect = laterEffects[0];
        findings.push({
          id: `SARMF-${String(findings.length + 1).padStart(3, "0")}`,
          analyzer: "SARMF deterministic source analyzer",
          category: "Reentrancy / state update after external value call",
          swc: SWC107,
          severity: "high",
          confidence: "high for the bounded syntactic rule",
          functionName: fn.name,
          line: lineNumber(source, statement.start),
          effectLine: lineNumber(source, effect.statement.start),
          call: statement.text,
          delayedEffect: effect.statement.text,
          target: effect.effect.target,
          recommendation: "Apply Checks-Effects-Interactions: move the identified state update before the external value call. Consider a reentrancy guard as defense in depth.",
          patchable: true,
          offsets: { callStart: statement.start, callEnd: statement.end, effectStart: effect.statement.start, effectEnd: effect.statement.end }
        });
      });
    });
    return { analyzer: "SARMF deterministic source analyzer v1.0", supportedRule: SWC107, findings };
  }

  function applyBoundedPatch(source, findingId) {
    const report = analyze(source);
    const finding = report.findings.find((item) => item.id === findingId) || report.findings[0];
    if (!finding) return { applied: false, reason: "No supported SWC-107 finding is available for patching.", source, report };
    const { callStart, callEnd, effectStart, effectEnd } = finding.offsets;
    if (!(callStart < callEnd && callEnd <= effectStart && effectStart < effectEnd)) {
      return { applied: false, reason: "The finding is not in the safe bounded reorder form.", source, report };
    }
    const between = source.slice(callEnd, effectStart);
    if (/\b(if|for|while|return)\b|[{}]/.test(between)) {
      return { applied: false, reason: "Control flow exists between the call and state update; automatic reordering was refused.", source, report };
    }
    const call = source.slice(callStart, callEnd).trim();
    const effect = source.slice(effectStart, effectEnd).trim();
    const indent = (source.slice(source.lastIndexOf("\n", callStart) + 1, callStart).match(/^\s*/) || [""])[0];
    const patched = source.slice(0, callStart) + `${effect}\n${indent}` + source.slice(callStart, effectStart) + source.slice(effectEnd);
    return {
      applied: true,
      mechanism: "Bounded deterministic Checks-Effects-Interactions statement reorder",
      finding,
      source: patched,
      changedStatements: { before: [call, effect], after: [effect, call] }
    };
  }

  function remediate(source) {
    const before = analyze(source);
    const patch = applyBoundedPatch(source);
    const after = analyze(patch.source);
    const originalIds = new Set(before.findings.map((x) => `${x.swc}:${x.functionName}:${x.target}`));
    const remaining = after.findings.filter((x) => originalIds.has(`${x.swc}:${x.functionName}:${x.target}`));
    return {
      before,
      patch,
      after,
      validation: {
        status: patch.applied && remaining.length === 0 ? "MITIGATED_WITHIN_SUPPORTED_RULE" : "NOT_MITIGATED",
        originalFindingCount: before.findings.length,
        remainingMatchingFindings: remaining.length,
        scope: "Syntactic SWC-107 Checks-Effects-Interactions rule only; not a proof of full contract security."
      }
    };
  }

  return { analyze, applyBoundedPatch, remediate, findFunctions, SWC107 };
});
