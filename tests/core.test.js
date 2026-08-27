const test = require("node:test");
const assert = require("node:assert/strict");
const { analyze, applyBoundedPatch, remediate } = require("../core.js");

const vulnerable = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract VulnerableVault {
    mapping(address => uint256) public balances;
    function withdraw(uint256 amount) external {
        require(balances[msg.sender] >= amount, "insufficient");
        (bool ok, ) = msg.sender.call{value: amount}("");
        require(ok, "transfer failed");
        balances[msg.sender] -= amount;
    }
}`;

test("detects SWC-107 state update after external value call", () => {
  const report = analyze(vulnerable);
  assert.equal(report.findings.length, 1);
  assert.equal(report.findings[0].swc, "SWC-107");
  assert.equal(report.findings[0].functionName, "withdraw");
  assert.equal(report.findings[0].line, 7);
  assert.equal(report.findings[0].effectLine, 9);
});

test("bounded patch reorders the identified state effect before interaction", () => {
  const patch = applyBoundedPatch(vulnerable);
  assert.equal(patch.applied, true);
  assert.ok(patch.source.indexOf("balances[msg.sender] -= amount;") < patch.source.indexOf("msg.sender.call{value: amount}"));
});

test("re-analysis clears the matching supported finding", () => {
  const result = remediate(vulnerable);
  assert.equal(result.before.findings.length, 1);
  assert.equal(result.after.findings.length, 0);
  assert.equal(result.validation.status, "MITIGATED_WITHIN_SUPPORTED_RULE");
});

test("already ordered Checks-Effects-Interactions contract is not flagged", () => {
  const safe = vulnerable.replace(
    '        (bool ok, ) = msg.sender.call{value: amount}("");\n        require(ok, "transfer failed");\n        balances[msg.sender] -= amount;',
    '        balances[msg.sender] -= amount;\n        (bool ok, ) = msg.sender.call{value: amount}("");\n        require(ok, "transfer failed");'
  );
  assert.equal(analyze(safe).findings.length, 0);
});

test("patch refuses ambiguous control flow between call and effect", () => {
  const ambiguous = vulnerable.replace('        balances[msg.sender] -= amount;', '        if (amount == 0) return;\n        balances[msg.sender] -= amount;');
  const patch = applyBoundedPatch(ambiguous);
  assert.equal(patch.applied, false);
  assert.match(patch.reason, /Control flow/);
});
