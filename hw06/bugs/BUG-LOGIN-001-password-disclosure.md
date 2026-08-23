# BUG-LOGIN-001 — Login response exposes plaintext password

## Status

Confirmed locally with Newman on 2026-08-23 UTC; GitHub Issue not yet published.

## Requirement

SEC-01: passwords must not be stored or disclosed as plaintext. A login response should not include a password field.

## Steps

1. Start an isolated EShop backend.
2. Send `POST /api/login` with `{"email":"test@eshop.com","password":"Test1234!"}` and `X-Student-Id: 23127001`.
3. Inspect `response.user`.

## Expected

`200 OK` may return a token and safe user profile fields, but must not return `password`.

## Actual

`200 OK`; Newman assertion `password not disclosed` failed because `response.user.password` exists.

## Evidence

`../results/newman-report.json` and `../results/newman-report.html`, collection item `LOGIN-001 valid user`.

## Proposed GitHub Issue title

`[SEC-01] POST /api/login exposes plaintext password in response`
