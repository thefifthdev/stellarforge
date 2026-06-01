# Contributing to StellarForge

Thanks for helping build the Soroban developer toolkit! This guide gets you from a
clean checkout to passing checks.

## Prerequisites

| Tool        | Version | Notes                                       |
| ----------- | ------- | ------------------------------------------- |
| Node.js     | ≥ 20    | Use `nvm use` (see `.nvmrc`).               |
| pnpm        | ≥ 9     | `npm i -g pnpm`                             |
| Rust        | stable  | For the template contracts.                 |
| Stellar CLI | ≥ 22    | For `sforge build`/`deploy`.                |
| wasm target | —       | `rustup target add wasm32v1-none`           |

## First-time setup

```bash
git clone https://github.com/thefifthdev/stellarforge.git
cd stellarforge
make install
make build          # build the CLI
make link           # link `sforge` globally (optional)
```

## Project layout

| Path                 | What it is                                |
| -------------------- | ----------------------------------------- |
| `packages/cli/`      | The `sforge` CLI (TypeScript) + tests.    |
| `templates/*/`       | Starter Soroban contracts (Cargo workspace). |
| `docs/`              | Usage and template reference.             |

## Running checks

These mirror CI — run them before opening a PR:

```bash
# CLI
pnpm lint
pnpm format:check
pnpm test
pnpm build

# Templates
cargo fmt --check
cargo clippy --all-targets -- -D warnings
cargo test
```

## Adding a template

See [`docs/templates.md`](docs/templates.md). In short: add
`templates/<name>/` (Cargo.toml + `src/lib.rs` with tests); the `templates/*`
workspace glob and `sforge templates` pick it up automatically.

## Commit conventions

[Conventional Commits](https://www.conventionalcommits.org/): `feat:`, `fix:`,
`docs:`, `refactor:`, `test:`, `ci:`, `chore:`.

## Stellar Wave / Drips

StellarForge participates in the **Stellar Wave Program** via
[Drips](https://www.drips.network/). Issues labeled **`Stellar Wave`** and
**`good first issue`** are open for contributors to earn rewards.
