# Usage

## Install

From the repo:

```bash
pnpm install && pnpm build
make link          # npm link the built CLI as `sforge`
```

`sforge build`/`test`/`deploy` require the [Stellar CLI](https://developers.stellar.org/docs/tools/cli)
and a Rust toolchain with the `wasm32v1-none` target.

## `sforge init <name> --template <template>`

Scaffolds a new standalone Soroban project:

```bash
sforge init payments --template escrow
```

This copies the template, renames the crate to `payments`, pins `soroban-sdk`,
adds an optimized `[profile.release]`, and writes a `.gitignore` and `README.md`.
The result builds and tests on its own — no workspace required.

## `sforge templates`

Lists the available templates (any directory in `templates/` with a `Cargo.toml`).

## `sforge build`

Wraps `stellar contract build`, producing optimized WASM under
`target/wasm32v1-none/release/`.

## `sforge test`

Wraps `cargo test` for the current project.

## `sforge deploy`

Wraps `stellar contract deploy`:

```bash
sforge deploy \
  --wasm target/wasm32v1-none/release/payments.wasm \
  --source my-identity \
  --network testnet
```

Create a funded identity first:

```bash
stellar keys generate my-identity --network testnet --fund
```
