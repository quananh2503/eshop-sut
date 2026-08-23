# HW06 CI/CD Report

## Pipeline design

The workflow definition is `ci/hw06-newman.yml`. Copy it to `.github/workflows/hw06-newman.yml` before pushing. It triggers manually and on changes to `backend/**` or `hw06/**`, installs backend dependencies, generates the collection, starts the backend, waits for localhost, runs Newman, and uploads reports with `if: always()`.

## Evidence to add after real GitHub runs

| Required run | Commit SHA/link | Screenshot | Status |
|---|---|---|---|
| Regression/smoke suite all passing | Pending — run workflow manually with `suite=smoke` after commit | Pending | Ready to run |
| Suite with one or more failing assertions | [Job 97165145920](https://github.com/quananh2503/eshop-sut/actions/runs/32627557227/job/97165145920) | Captured by student from job log | Completed |

The current full local run invoked 120 unique primary IDs and has 35 failed assertions, so it is not suitable to represent the all-pass CI example. The new `23127001_HW06_API_CI_Smoke` collection covers one audited-passing behavior for each selected API: login contract, missing-JWT rejection on cancel, and admin confirmation of a pending order. Retain the specification suite as the failing run.
