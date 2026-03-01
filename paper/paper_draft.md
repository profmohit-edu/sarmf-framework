SARMF-Bench: A Reproducible Smart Contract Vulnerability Benchmark for Static Analysis Evaluation

## Abstract

This paper presents SARMF-Bench, a structured and reproducible benchmark of curated smart contract vulnerabilities designed for evaluating static analysis tools. The benchmark consists of five categorized vulnerability classes: reentrancy, arithmetic overflow, access-control weakness, unchecked external calls, and denial-of-service patterns. Each contract is version-controlled and analyzed using Slither v0.11.5 under a deterministic environment. The resulting machine-readable outputs enable systematic evaluation of detection behavior and reproducibility validation. SARMF-Bench provides a lightweight yet structured foundation for empirical smart contract security experimentation.

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
