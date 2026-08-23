---
name: generate-eshop-api-tests
description: Generate traceable API-test partitions from an EShop API contract without fabricating execution evidence.
---

# EShop API-test generator

Input: an endpoint contract, SRS requirements/security requirements, and state model.

1. Extract required fields, types, response fields, authentication and preconditions.
2. Derive valid, invalid, missing, null, boundary and type-mismatch partitions for each input.
3. Add authorization/IDOR/security partitions where applicable.
4. Enumerate every valid and invalid state edge where the resource is stateful.
5. Emit atomic test cases with traceability, expected status/schema and an `AI` source marker.
6. Mark a minimum of five high-risk gap candidates for human extension.
7. Never assert that a case passed, failed, exposed a bug, or produced an artifact until a supplied real execution result proves it.

## Pseudocode

```text
for endpoint in selected_endpoints:
    contract = parse(spec, endpoint)
    cases = partitions(contract.inputs) + schema_cases(contract.response)
    cases += auth_and_security_cases(contract, requirements)
    if endpoint.is_stateful:
        cases += allowed_edges(state_model) + forbidden_edges(state_model)
    cases = make_atomic_and_traceable(cases)
    review_queue = label_for_human_audit(cases)
    output(cases, review_queue, human_gap_candidates(5))
```
