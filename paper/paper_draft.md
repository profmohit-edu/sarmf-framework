# SARMF: A Reproducible Smart Contract Security Engineering Framework

## Abstract

SARMF (Smart Contract Automated Remediation and Mitigation Framework) provides a structured, reproducible pipeline for Ethereum smart contract vulnerability detection, normalization, mitigation, and validation. The framework integrates static and symbolic analysis tools and preserves all artifacts under DOI-indexed releases to enable independent verification.

## 1. Introduction

Smart contract vulnerabilities result in irreversible financial loss. Current auditing practices lack reproducibility and standardized remediation workflows. SARMF introduces a deterministic security engineering model addressing this gap.

## 2. Contributions

1. Deterministic environment configuration
2. Multi-tool vulnerability normalization
3. SWC-aligned mitigation mapping
4. Post-mitigation validation loop
5. DOI-backed artifact preservation

## 3. Experimental Setup

### 3.1 Deterministic Environment Configuration

All experiments are executed in a controlled Linux-based environment with explicit version locking of:

- Solidity compiler
- Slither static analyzer
- Mythril symbolic analyzer (Docker execution recommended)

Tool outputs are archived as JSON artifacts under the `results/` directory.

## 4. Reproducibility

Methodology DOI:
https://dx.doi.org/10.17504/protocols.io.bp216eyxdgqe/v1

Software DOI:
https://doi.org/10.5281/zenodo.18754015

All benchmark contracts, mitigation patches, and evaluation results are preserved within this repository.
