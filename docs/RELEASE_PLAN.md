# MerchantFlow — Delivery plan and release gates

## v0.1: Concept demonstration
Deliverable: interactive prototype on GitHub Pages; synthetic data; rule-based prioritization; local issue-status persistence.
Status: **published**, but independent production verification and usability evaluation not yet recorded.

## v0.2: Reliability
- Add automated test coverage for classification and edge cases.
- Make rules, assumptions, and thresholds visible in UI.
- Test keyboard navigation, empty states, refresh persistence and reset.
- Record test outcomes with date, browser, expected and actual behavior.
Gate: zero critical functional defects.

## v0.3: Collaboration-ready product
- Create API-backed issue and user model.
- Add shared status persistence, audit history and role permissions.
- Validate data model against multiple fulfillment locations.
Gate: two separate users can view consistent issue status.

## v1.0: Demonstrated value
- Run at least five usability tests using a consistent task script.
- Record median triage time, accuracy and qualitative issues.
- Implement at least one improvement based on observed feedback.
- Publish before/after decision rationale and a two-minute demo.

## Definition of done
Code committed, tests executed and results recorded, limitations disclosed, release notes published, and demo verified in browser. A feature is not complete simply because its code was written.

## Initial backlog
| ID | User story | Priority | Acceptance |
| --- | --- | --- | --- |
| MF-01 | As an operator I can see flagged orders | P0 | Reasons and priority visible |
| MF-02 | As an operator I can find an order | P0 | Search and status filters combine |
| MF-03 | As an operator I can mark an issue resolved | P0 | Status survives refresh |
| MF-04 | As an operator I can understand scoring | P0 | Rule weights documented |
| MF-05 | As a team member I can share status | P1 | Cross-session consistency |
| MF-06 | As a PM I can evaluate triage time | P1 | Measured usability task |
