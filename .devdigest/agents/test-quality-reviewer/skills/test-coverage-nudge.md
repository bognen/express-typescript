# Test Coverage Nudge

Apply this whenever the PR adds or changes tests, or changes production code
without touching any test. Check each of these and report only what you can
ground in the diff:

1. **Uncovered branches** — every new or changed branch (if/else, switch case,
   early return, catch, ternary, fallback) must have an assertion that exercises
   it. Flag each uncovered branch by `file:line`.
2. **Missed edge cases** — empty, null/undefined, boundary values, error paths, and
   concurrency/ordering inputs that the new logic handles but no test drives.
3. **Excessive mocking** — mocks that assert their own setup, mocking the unit under
   test, or stubbing so much that the test can no longer fail when the real
   behaviour breaks.
4. **Flaky-test patterns** — real clocks or `sleep`, unseeded randomness, live
   network calls, shared mutable state between tests, and order-dependent tests.

Severity guidance: tests that only cover the happy path of NEW branching logic are a
**WARNING**. Escalate to CRITICAL only when a changed critical path (auth, money,
data integrity) is left with no meaningful test at all. A flaky-test pattern is a
WARNING; speculative gaps ("might not cover") stay at most WARNING.