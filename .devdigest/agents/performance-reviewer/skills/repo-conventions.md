# repo-conventions

House conventions for `acme/payments-api`, extracted from the repository and confirmed by a maintainer. Flag changes that violate any rule below and cite the offending `file:line`. A rule that does not apply to the diff under review is not a finding.

## throw-a-typed-apperror-subclass-instead
Throw a typed AppError subclass instead of returning null for a missing row

Route handlers rely on the error handler to map it to a 404, never on null checks.

Detected in `src/services/payments.ts:42`:

```
if (!payment) throw new NotFoundError("Payment not found");
```