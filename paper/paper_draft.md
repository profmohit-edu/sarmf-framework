# SARMF-Bench: A Reproducible Smart Contract Vulnerability Benchmark for Static Analysis Evaluation

## Abstract

This paper presents SARMF-Bench, a structured and reproducible benchmark of curated smart contract vulnerabilities designed for evaluating static analysis tools. The benchmark consists of five categorized vulnerability classes: reentrancy, arithmetic overflow, access-control weakness, unchecked external calls, and denial-of-service patterns. Each contract is version-controlled and analyzed using Slither v0.11.5 under a deterministic environment. The resulting machine-readable outputs enable systematic evaluation of detection behavior and reproducibility validation. SARMF-Bench provides a lightweight yet structured foundation for empirical smart contract security experimentation.

---

## 1. Introduction

Smart contracts form the execution backbone of decentralized blockchain applications. Due to their immutable nature, security vulnerabilities can lead to irreversible financial and operational consequences. Vulnerability classes such as reentrancy, denial-of-service (DoS), unchecked external calls, and access-control misconfigurations continue to affect deployed smart contracts despite the availability of static analysis tools.

Although tools such as Slither are widely used for vulnerability detection, empirical evaluation often lacks structured and reproducible benchmark datasets. Many studies rely on ad-hoc contract samples without systematic categorization or artifact preservation, limiting reproducibility and comparative evaluation.

This paper introduces SARMF-Bench, a lightweight and reproducible benchmark suite consisting of five curated smart contract vulnerability categories. Each contract is isolated, version-controlled, and evaluated under a deterministic static analysis configuration.

The objective of SARMF-Bench is to provide:

- A categorized vulnerability dataset (SC01–SC05)
- Deterministic static analysis execution
- Machine-readable detection outputs
- A reproducible experimental foundation for smart contract security research

---

## 2. Benchmark Design

### 2.1 Vulnerability Categories

SARMF-Bench includes five curated vulnerability implementations:

- SC01 – Reentrancy  
- SC02 – Arithmetic Overflow  
- SC03 – Access-Control Weakness  
- SC04 – Unchecked External Call  
- SC05 – Denial-of-Service Pattern  

Each contract is intentionally minimal to isolate the target vulnerability without confounding structural complexity. The implementations reproduce known vulnerability behaviors while remaining concise and auditable.

---

### 2.2 Repository Structure

The benchmark follows a deterministic repository layout:

- `/contracts/SC01–SC05/` – Vulnerable smart contracts  
- `/results/slither/` – Static analysis JSON outputs  
- `/paper/` – Manuscript documentation  

All components are version-controlled to ensure reproducibility. Static analysis outputs are preserved as machine-readable JSON artifacts to support structured evaluation and replication.

---

## 3. Experimental Evaluation

### 3.1 Analysis Configuration

All contracts were analyzed using **Slither v0.11.5** with Solidity version 0.8.x under Ubuntu Linux. The analysis was performed in a deterministic environment with explicit tool version locking. Results were exported as structured JSON outputs and archived under the `/results/slither/` directory.

---

### 3.2 Detection Results

| Case | Vulnerability | Slither Detection | Observation |
|------|--------------|------------------|------------|
| SC01 | Reentrancy | Detected | External call before state update |
| SC02 | Overflow | Not Detected | Solidity 0.8 built-in overflow protection |
| SC03 | Access Control | Detected | Missing zero-address validation |
| SC04 | Unchecked Call | Detected | Ignored return value of call() |
| SC05 | DoS | Detected | External transfer inside loop |

---

## 4. Discussion

The experimental results demonstrate that Slither effectively detects structural vulnerabilities such as reentrancy, unchecked calls, access-control flaws, and denial-of-service patterns. These findings confirm the capability of rule-based static analysis in identifying common architectural weaknesses in smart contracts.

Arithmetic overflow (SC02) was not detected due to built-in protections introduced in Solidity version 0.8 and above. This highlights the influence of compiler-level safeguards on vulnerability manifestation and detection outcomes. The benchmark therefore not only evaluates tool performance but also illustrates how language evolution impacts security analysis results.

The use of minimal, isolated vulnerability implementations ensures clarity in interpretation and reproducibility of detection behavior. SARMF-Bench demonstrates that lightweight, categorized datasets can support structured empirical evaluation without requiring large-scale contract corpora.

---

## 5. Conclusion

This paper presented SARMF-Bench, a reproducible smart contract vulnerability benchmark consisting of five curated vulnerability classes. The benchmark enables deterministic static analysis experimentation and machine-readable artifact preservation. SARMF-Bench provides a structured foundation for future comparative evaluation of smart contract security tools and reproducible blockchain security research.

---

## 6. Related Work

Smart contract security has been extensively studied in recent years. Static analysis tools such as Slither provide rule-based vulnerability detection tailored for Ethereum smart contracts. Symbolic execution tools like Mythril and Oyente have also been proposed to identify reentrancy and logic-level vulnerabilities.

Prior empirical studies often evaluate detection tools using large contract corpora extracted from blockchain deployments. However, many such datasets lack controlled categorization and minimal reproducible implementations. The absence of lightweight benchmark suites limits structured tool comparison and controlled experimental validation.

SARMF-Bench complements existing research by introducing a minimal, categorized, and version-controlled vulnerability benchmark focused specifically on reproducibility and deterministic evaluation.

---

## References

[1] J. Feist, G. Grieco, and A. Groce, “Slither: A Static Analysis Framework for Smart Contracts,” IEEE Symposium on Security and Privacy Workshops, 2019.

[2] L. Brent et al., “Vandal: A Scalable Security Analysis Framework for Smart Contracts,” arXiv preprint arXiv:1809.03981, 2018.

[3] L. Luu et al., “Making Smart Contracts Smarter,” ACM CCS, 2016.

[4] N. Atzei, M. Bartoletti, and T. Cimoli, “A Survey of Attacks on Ethereum Smart Contracts,” International Conference on Principles of Security and Trust, 2017.

[5] ConsenSys Diligence, “Smart Contract Best Practices,” 2020.
