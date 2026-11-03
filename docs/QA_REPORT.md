# MerchantFlow — QA evidence log

**Product owner:** Esoham Abalo

## 2026-11-03: Owner-reported browser smoke test
**Environment:** Published GitHub Pages prototype; browser/version not recorded.  
**Evidence:** Owner reported that both portfolio apps loaded and allowed interaction.  
**Scope:** General interaction only. Search, filtering, persistence, reset, mobile and keyboard accessibility remain unverified.

## 2026-11-03: Node.js rules-engine test coverage
**Method:** Test scenarios are defined in the repository; execution evidence still needs to be captured.  
**Result:** Not independently verified against the exact committed test suite. No passing test count is claimed without reproducible output.

**Evidence limitation:** No exact repository test execution output or CI result has been captured.

## CI status
Workflow committed at `.github/workflows/tests.yml`. **GitHub Actions result not confirmed.**

## v0.2 QA matrix
| Case | Result |
|---|---|
| Published app loads and responds to interactions | Pass — owner reported, broad |
| Core scoring logic, representative Node.js cases | Committed; execution unverified |
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
