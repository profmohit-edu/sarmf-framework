# SARMF — Smart Contract Automated Remediation and Mitigation Framework

SARMF is a bounded working model for traceable Solidity vulnerability analysis, deterministic remediation and same-rule validation. It preserves the DOI-backed SARMF-Bench research record while adding an executable remediation workflow.

## Implemented end-to-end workflow

`Solidity input → deterministic SWC-107 finding → location/category → bounded CEI patch → before/after comparison → same-rule re-analysis → mitigation status`

The implemented analyzer detects a supported syntactic form in which an external value call occurs before a state effect in the same Solidity function. The automated patch moves the precisely identified state-effect statement before the call only when the statements are in a bounded straight-line form. It refuses automatic reordering when intervening control flow makes the transformation ambiguous.

The words **deterministic finding**, **automatic patch**, **recommendation**, and **validation** are presented separately in the interface. No generative-AI output is used in this release.

## Integrity and scope

- `MITIGATED_WITHIN_SUPPORTED_RULE` means re-analysis no longer detects the original SWC-107 syntactic pattern.
- It is not a proof that the entire contract is secure or behaviorally equivalent under every environment.
- The recommendation to consider a reentrancy guard is not automatically applied.
- The original SARMF-Bench landing page is preserved at `research-assets/sarmf-bench-landing-2026-03.html`.
- Existing `CITATION.cff` and `citation.bib` remain intact.

## Run locally

Open `index.html` in a browser, or serve the repository with any static web server.

## Tests

```bash
node --test tests/core.test.js
```

The tests cover detection and location, bounded patch generation, successful re-analysis, a safe Checks-Effects-Interactions example, and refusal of an ambiguous transformation.

## Existing research record

The repository previously documented SARMF-Bench and its SWC-aligned benchmark methodology. Existing archival identifiers are retained, including Zenodo `10.5281/zenodo.18754015`, IEEE DataPort `10.21227/zj4q-p934`, Harvard Dataverse `10.7910/DVN/0SP3OO`, Mendeley Data `10.17632/kd3vcpnn9v.1`, OSF `10.17605/OSF.IO/EJWDC`, and the protocol DOI cited in the original repository.

## Maintainer

Mohit Tiwari  
Department of Computer Science and Engineering  
Bharati Vidyapeeth's College of Engineering, New Delhi
