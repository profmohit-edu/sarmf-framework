# SARMF-Bench

Official DOI Records:

- IEEE DataPort: https://doi.org/10.21227/zj4q-p934
- Zenodo: https://doi.org/10.5281/zenodo.18754015
- Harvard Dataverse: https://doi.org/10.7910/DVN/0SP3OO
- Mendeley Data: https://doi.org/10.17632/kd3vcpnn9v.1
- OSF: https://doi.org/10.17605/OSF.IO/EJWDC
- Protocol: https://doi.org/10.17504/protocols.io.bp2l6eyxdgqe/v1

  
# SARMF – Smart Contract Automated Remediation and Mitigation Framework

## Overview

SARMF is a DOI-indexed reproducible security engineering framework designed for systematic vulnerability detection, taxonomy alignment, automated remediation, and adversarial validation of Ethereum-compatible smart contracts.

This repository provides the engineering structure, workflow definition, and reproducibility scaffolding aligned with the published SARMF protocol.

Primary DOI:
https://dx.doi.org/10.17504/protocols.io.bp216eyxdgqe/v1

---
## Project highlight

Over the last few months I have been quietly building SARMF‑Bench from scratch as my flagship smart contract security project – a complete benchmark, toolchain and reproducibility pipeline, fully version‑controlled and archived with DOIs. This is not just a paper; it is an end‑to‑end research artifact that can be dropped into other people’s experiments and courses.

Excited to share SARMF‑Bench, a deterministic smart contract vulnerability benchmark that I have designed and implemented as a single‑author research project.

SARMF‑Bench currently includes 5 SWC‑aligned, minimal Solidity contracts:

- **SC01 – Reentrancy (SWC‑107)**
- **SC02 – Integer overflow (SWC‑101)**
- **SC03 – Access‑control weakness (SWC‑105)**
- **SC04 – Unchecked external calls (SWC‑104)**
- **SC05 – Denial‑of‑service via unbounded loops (SWC‑113)**

Each contract is evaluated with **Slither v0.11.5** under a version‑locked environment, and the complete JSON detection artifacts are preserved to enable fully reproducible static‑analysis experiments.

**Resources**

- GitHub (code + JSON artifacts): https://github.com/profmohit-edu/sarmf-framework  
- Software DOI: `10.5281/zenodo.18754015`  
- Reproducibility protocol DOI: `10.17504/protocols.io.bp216eyxdgqe/v1`  

The SARMF‑Bench paper is currently under review at the **Science of Blockchain Conference (SBC) 2026, Stanford**. I’m happy to collaborate with anyone interested in using this benchmark to evaluate static analyzers, fuzzers, or AI‑based security tools.



## Objectives

• Deterministic environment reproducibility  
• Multi-tool static vulnerability detection  
• SWC-aligned vulnerability normalization  
• Rule-based automated patch generation  
• Behavioral verification and adversarial validation  
• Audit-grade reporting and traceability  

---

## Architecture Layers

1. Environment Standardization Layer  
2. Static Analysis Aggregation Layer  
3. Vulnerability Taxonomy Mapping  
4. Automated Remediation Engine  
5. Adversarial Validation Pipeline  
6. Audit Reporting Module  

---

## Reproducibility Principles

SARMF enforces:

• Toolchain determinism  
• Version-locked execution  
• Controlled dependency resolution  
• Traceable remediation diffs  
• Measurable security delta validation  

---

## Citation

If you use this framework, please cite:

Mohit Tiwari.  
SARMF: Smart Contract Automated Remediation and Mitigation Framework.  
DOI: 10.17504/protocols.io.bp216eyxdgqe/v1

Software Heritage persistent revision (SWHID):
swh:1:rev:0577284fd94ca54a74316ff87921e043798e1edb
---

## License

Research and academic usage permitted with attribution.
