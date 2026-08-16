# JMeter performance evidence review checklist

## Scope and design

- [ ] Assignment version is explicit and requirements are not mixed.
- [ ] Endpoint groups are defensible from API behavior, not only HTTP method.
- [ ] Prior feature allocation/non-duplication has a source.
- [ ] Load, Stress and Spike shapes are materially different.
- [ ] Counts/ramp/duration are justified by hardware, baseline or iteration.
- [ ] Endurance has a stated stability criterion and real 10–15 minute run.

## JMX and data

- [ ] Filename and TestPlan name follow the student/date convention.
- [ ] Every endpoint group has its own CSV.
- [ ] CSV contains no blank record, malformed row or secret to publish.
- [ ] Variables never become empty or `<EOF>` while recycling.
- [ ] Authentication setup is excluded from unrelated measured samples.
- [ ] HTTP method/path/body/header match source/API documentation.
- [ ] Connection/response timeout, keep-alive, pacing and assertions exist.
- [ ] Report views are distinct if the rubric requires them.
- [ ] GUI listener overhead is acknowledged when interpreting client resource use.

## Smoke validation

- [ ] Smoke output is outside official submission paths.
- [ ] Every label contains the intended CSV case ID.
- [ ] Valid smoke samples pass assertions.
- [ ] A failed smoke sample is triaged as test-data, environment or SUT defect.
- [ ] Smoke metrics are never called the final threshold.

## Official execution

- [ ] Backend/SUT commit and environment are fixed.
- [ ] Mutable database is backed up before reset.
- [ ] Non-GUI command, timestamp and exact properties are recorded.
- [ ] Raw JTL is preserved before rerun.
- [ ] HTML dashboard comes from the matching JTL.
- [ ] JMeter/terminal and backend resource monitor share a frame.
- [ ] Hardware screenshot contains attributable hostname/spec.

## Analysis

- [ ] p95 calculation method is stated.
- [ ] Throughput window and units are stated.
- [ ] Expected business failures are separated from transport/server errors.
- [ ] Backend CPU/RAM claims cite monitor evidence, not JTL.
- [ ] AI claims are recomputed from raw logs.
- [ ] Optimization feasibility is checked against source/config.
- [ ] A GitHub Issue exists only for a reproduced issue with evidence.

## Submission integrity

- [ ] No `PENDING` markers remain.
- [ ] Markdown and PDF versions match.
- [ ] AI Audit includes real prompt/output and human review.
- [ ] AI Critique is 200–300 words and discusses actual mistakes.
- [ ] Video is long enough, has the student's voice and shows required evidence.
- [ ] Git log shows meaningful procedural commits.

