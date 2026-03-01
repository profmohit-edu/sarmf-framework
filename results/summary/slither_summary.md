## SC01 – Reentrancy
Contract: VulnerableBank.sol
Tool: Slither

Detected Issues:

1. Reentrancy vulnerability (check: reentrancy-eth)
   - External call via msg.sender.call{value: amount}()
   - State variable balances updated AFTER external call
   - Cross-function reentrancy possible via deposit() and withdraw()

2. Unsafe low-level call usage
   - Direct call() invocation without proper reentrancy guard

3. Solidity version constraint risk
   - ^0.8.0 includes known compiler issues# SARMF – Slither Benchmark Summary

## SC02 – Integer Overflow
Contract: OverflowSample.sol
Tool: Slither

Detected Issues:

1. No arithmetic overflow vulnerability detected.
   - Solidity version ^0.8.0 includes built-in overflow protection.
   - Arithmetic operations are automatically checked for overflow/underflow.

2. Solidity version constraint warning:
   - ^0.8.0 contains known compiler issues (as reported by Slither).
- 

## SC03 – Access Control
Contract: AccessControlSample.sol
Tool: Slither

Detected Issues:

1. Missing zero-address validation:
   - changeOwner(address newOwner) does not check if newOwner == address(0).
   - owner = newOwner executed without validation.
   - May result in loss of contract control.

2. Solidity version constraint warning:
   - ^0.8.0 includes known compiler issues (as reported by Slither).
- 

## SC04 – Unchecked Call
Contract: UncheckedCallSample.sol
Tool: Slither
Detected Issues:
- 

## SC05 – Denial of Service
Contract: DOSSample.sol
Tool: Slither
Detected Issues:
- 
