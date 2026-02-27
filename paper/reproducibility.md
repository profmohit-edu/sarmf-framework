# Reproducibility Statement – SARMF

This repository provides a reproducible benchmark evaluation pipeline for smart contract security engineering.

## Public Artifacts

Methodology (Protocol DOI):
https://dx.doi.org/10.17504/protocols.io.bp216eyxdgqe/v1

Software Artifact (Zenodo DOI):
https://doi.org/10.5281/zenodo.18754015

## Repository Structure

- `contracts/` → Vulnerable and patched contracts
- `results/` → JSON tool outputs
- `dataset/` → Benchmark evaluation sheets
- `paper/` → Draft manuscript and documentation
- `reports/` → Evaluation summaries

## Execution Model

- Static Analysis: Slither
- Symbolic Analysis: Mythril (Docker recommended)
- Solidity compiler version pinned per benchmark entry
