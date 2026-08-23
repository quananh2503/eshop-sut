# BUG-ADMINSTATUS-001 — Ordinary user can update an order through an admin endpoint

## Status

Confirmed locally with Newman on 2026-08-23 UTC; GitHub Issue not yet published.

## Requirement

SEC-03 and FR-12/FR-18 require `/api/admin/*` endpoints to verify `role = admin`, not merely a valid JWT.

## Steps

1. Login as the seeded ordinary user and retain the JWT.
2. Create a pending order with that user via `POST /api/checkout`.
3. Send `PUT /api/admin/orders/{orderId}/status` with the ordinary user JWT and body `{"status":"confirmed"}`.
4. Include `X-Student-Id: 23127001`.

## Expected

The API rejects the request with `401` or `403`, and the order remains pending.

## Actual

The API returned `200 OK`; Newman failed the assertion `ordinary user denied`.

## Evidence

`../results/newman-report.json` and `../results/newman-report.html`, collection item `ADMINSTATUS ordinary user denied`.

## Proposed GitHub Issue title

`[SEC-03] Ordinary user JWT can call PUT /api/admin/orders/:id/status`
