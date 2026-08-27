const sample = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VulnerableVault {
    mapping(address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "insufficient");
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "transfer failed");
        balances[msg.sender] -= amount;
    }
}`;

const $ = (selector) => document.querySelector(selector);
const code = $("#contract-input");
let lastResult = null;

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[char]);
}

function numbered(source) {
  return source.split("\n").map((line, index) => `<span><b>${String(index + 1).padStart(2, "0")}</b>${escapeHtml(line)}</span>`).join("");
}

function findingCard(finding) {
  return `<article class="finding"><div><strong>${finding.id} · ${finding.swc}</strong><span class="severity">${finding.severity}</span></div>
    <h3>${finding.category}</h3>
    <p><b>Deterministic analyzer location:</b> function <code>${finding.functionName}</code>, external call line ${finding.line}; delayed state effect line ${finding.effectLine}.</p>
    <pre>${escapeHtml(finding.call)}\n…\n${escapeHtml(finding.delayedEffect)}</pre>
    <p><b>Recommendation:</b> ${finding.recommendation}</p></article>`;
}

function analyzeOnly() {
  try {
    const report = SarmfCore.analyze(code.value);
    $("#analysis-status").textContent = `${report.findings.length} supported finding(s) detected.`;
    $("#findings").innerHTML = report.findings.length ? report.findings.map(findingCard).join("") : '<div class="success">No SWC-107 finding matched the supported syntactic rule.</div>';
    $("#pipeline-state").textContent = "ANALYZED";
  } catch (error) {
    $("#analysis-status").textContent = error.message;
  }
}

function runRemediation() {
  try {
    lastResult = SarmfCore.remediate(code.value);
    const finding = lastResult.before.findings[0];
    $("#analysis-status").textContent = `${lastResult.before.findings.length} supported finding(s) detected before remediation.`;
    $("#findings").innerHTML = finding ? findingCard(finding) : '<div class="success">No supported finding available to remediate.</div>';
    $("#patch-kind").textContent = lastResult.patch.applied ? `AUTOMATIC PATCH APPLIED: ${lastResult.patch.mechanism}` : `PATCH REFUSED: ${lastResult.patch.reason}`;
    $("#before-code").innerHTML = numbered(code.value);
    $("#after-code").innerHTML = numbered(lastResult.patch.source);
    $("#validation").innerHTML = `<div class="validation ${lastResult.validation.status.startsWith("MITIGATED") ? "ok" : "bad"}">
      <strong>${lastResult.validation.status}</strong>
      <span>Before: ${lastResult.validation.originalFindingCount} supported finding(s)</span>
      <span>After re-analysis: ${lastResult.after.findings.length} supported finding(s)</span>
      <p>${lastResult.validation.scope}</p></div>`;
    $("#pipeline-state").textContent = lastResult.validation.status;
    $("#results").hidden = false;
    $("#results").scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    $("#analysis-status").textContent = error.message;
  }
}

$("#load-sample").onclick = () => { code.value = sample; analyzeOnly(); };
$("#analyze").onclick = analyzeOnly;
$("#remediate").onclick = runRemediation;
$("#download").onclick = () => {
  if (!lastResult) return;
  const sanitized = JSON.parse(JSON.stringify(lastResult, (key, value) => key === "offsets" ? undefined : value));
  const blob = new Blob([JSON.stringify({ generatedAt: new Date().toISOString(), ...sanitized }, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "sarmf-remediation-report.json";
  link.click();
  URL.revokeObjectURL(link.href);
};

code.value = sample;
analyzeOnly();
