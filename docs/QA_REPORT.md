# MerchantFlow — QA evidence log

## 2026-11-03: Owner-reported browser smoke test
**Environment:** Published GitHub Pages prototype; browser/version not recorded.  
**Evidence:** Owner reported that both portfolio apps loaded and allowed interaction.  
**Scope:** General interaction only. Search, filtering, persistence, reset, mobile and keyboard accessibility remain unverified.

## 2026-11-03: Independent Node.js rules-engine verification
**Executor:** ChatGPT, isolated local Node.js runtime.  
**Method:** Reconstructed the current GitHub `src/risk-engine.mjs` source and a 15-case test harness covering the same major behavior and boundaries as the repository's unit tests; executed `node --test` locally.  
**Result:** **15 passed / 0 failed**, including shortage, overdue boundaries, unknown stock, partial fulfillment, manual attention, queue ordering, combined signals and invalid input.

**Important evidence limitation:** This was a local reconstruction and representative harness, **not an execution of the GitHub checkout's exact committed test files**. The result must not be presented as proof of passing GitHub CI, complete test coverage, or browser end-to-end QA.

## CI status
Workflow committed at `.github/workflows/tests.yml`. **GitHub Actions result not confirmed.**

## v0.2 QA matrix
| Case | Result |
|---|---|
| Published app loads and responds to interactions | Pass — owner reported, broad |
| Core scoring logic, representative Node.js cases | Pass — 15 local checks |
| Exact committed GitHub test suite | Not independently executed |
| GitHub Actions workflow | Not confirmed |
| Search and filter combined | Not verified |
| Status persistence after refresh | Not verified |
| Reset to defaults | Not verified |
| Keyboard-only navigation | Not verified |
| Mobile viewport layout | Not verified |
| Demo rule consistency with shared engine | Not verified |

## Release gate
**v0.2 QA is not yet signed off.** Before claiming completion: confirm exact repo CI, test browser scenarios, record defects and retests, and capture reproducible evidence. No user interviews or product-impact outcomes have been measured.
