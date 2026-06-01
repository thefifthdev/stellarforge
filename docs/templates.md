# Templates

Templates live in `templates/` and are real, tested Soroban crates. They are also
a Cargo workspace, so `cargo test` validates every template in CI.

## `counter`

The simplest starter. Demonstrates:

- Instance storage with a typed `DataKey`.
- An authenticated mutation (`increment` requires `caller.require_auth()`).
- Event publishing.
- A unit test using `mock_all_auths`.

```bash
sforge init my-counter --template counter
```

## `escrow`

A two-party token escrow. Demonstrates:

- SEP-41 token transfers into and out of the contract.
- A custom `#[contracterror]` enum.
- A small state machine (`init` → `release`/`refund`, single settlement).
- Four unit tests covering release, refund, double-settle, and validation.

```bash
sforge init my-escrow --template escrow
```

## Adding a template

1. Create `templates/<name>/` with a `Cargo.toml` (using
   `soroban-sdk = { workspace = true }`) and `src/lib.rs` with tests.
2. Add it to the workspace members (the `templates/*` glob already covers it).
3. `cargo test` to verify. `sforge templates` will list it automatically.

New templates are great **`good first issue`** contributions — see the seeded
issues.
