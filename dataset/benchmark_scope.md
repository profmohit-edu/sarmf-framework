# SARMF Benchmark Scope – Version 1.0

This benchmark defines the controlled evaluation set used to assess the SARMF (Smart Contract Automated Remediation and Mitigation Framework).

## Selection Criteria

The contracts included in this benchmark:

- Represent well-documented Ethereum smart contract vulnerabilities
- Are aligned with the SWC (Smart Contract Weakness Classification) taxonomy
- Are publicly reproducible
- Are compatible with Solidity static analysis tools (Slither, Mythril)

## Selected Vulnerability Categories

| Contract ID | Vulnerability Type | SWC ID |
|------------|--------------------|--------|
| SC01 | Reentrancy | SWC-107 |
| SC02 | Integer Overflow / Underflow | SWC-101 |
| SC03 | Unchecked External Call | SWC-104 |
| SC04 | Access Control Misconfiguration | SWC-105 |
| SC05 | Denial of Service | SWC-113 |
| SC06 | Timestamp Dependence | SWC-116 |
| SC07 | tx.origin Authentication | SWC-115 |
| SC08 | Front-Running Vulnerability | SWC-114 |
| SC09 | Improper Constructor Naming | SWC-118 |
| SC10 | Missing Input Validation | SWC-123 |

## Benchmark Philosophy

The objective is not tool competition.

The objective is to evaluate:

1. Vulnerability normalization
2. Mitigation traceability
3. Post-patch validation
4. Security delta measurement

This benchmark forms the basis for empirical evaluation reported in the SARMF research paper.
