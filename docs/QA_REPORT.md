# MerchantFlow — QA evidence log

## 2026-11-03: Initial manual smoke test
**Reporter:** Product owner (self-reported through ChatGPT conversation).  
**Environment:** Public GitHub Pages demo; browser/version not recorded.  
**Result:** Product owner confirmed that the application loads and allows interaction with records.  
**Scope:** Basic smoke test only. Individual scenarios (search, filtering, persistence, reset, accessibility) were not separately attested, so their status remains **Not verified**.

## Automated tests
Unit tests committed in `test/risk-engine.test.mjs` and `test/normalize-orders.test.mjs`. GitHub Actions workflow configured at `.github/workflows/tests.yml`. **Passing CI status not independently verified** at the time of this log.

## v0.2 QA matrix
| Case | Expected | Status |
|---|---|---|
| App loads | Dashboard renders | Pass (owner-reported) |
| Record interaction | Review dialog responds | Pass (owner-reported, broad) |
| Risk ranking | Higher score first | Automated test committed; execution unverified |
| Fulfilled order | Excluded from queue | Automated test committed; execution unverified |
| Search + filter | Results reflect both inputs | Not verified |
| Refresh persistence | Status retained in same browser | Not verified |
| Reset | Returns all statuses to initial | Not verified |
| Keyboard-only flow | All actions reachable | Not verified |
| Mobile layout | No clipped critical actions | Not verified |

## Next
Check CI, execute each manual scenario, capture date/device/browser, record defects, fix, and rerun. Do not describe tests as passed until actually executed.
