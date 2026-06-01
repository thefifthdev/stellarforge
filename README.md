# StellarForge 🔧

> The developer CLI and scaffolding toolkit for Soroban smart contracts on Stellar.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Stellar](https://img.shields.io/badge/Built%20for-Stellar-black)](https://stellar.org)
[![Soroban](https://img.shields.io/badge/Soroban-Smart%20Contracts-purple)](https://soroban.stellar.org)
[![Status](https://img.shields.io/badge/Status-MVP-2dd4bf)]()

Building on Soroban means stitching together manual project setup, ad-hoc deploy
scripts, and near-zero starting scaffolding. Ethereum has Hardhat and Foundry;
Solana has Anchor. **StellarForge brings that batteries-included experience to
Stellar.**

`sforge` scaffolds best-practice Soroban projects from tested templates and wraps
the build/test/deploy loop in one tool.

---

## Quick start

```bash
pnpm install && pnpm build
make link            # links `sforge` globally (npm link)

sforge init my-escrow --template escrow
cd my-escrow
sforge build         # → optimized WASM (wraps `stellar contract build`)
sforge test          # → cargo test
sforge deploy --wasm target/wasm32v1-none/release/escrow.wasm \
  --source my-identity --network testnet
```

## Commands

| Command                                   | What it does                                            |
| ----------------------------------------- | ------------------------------------------------------- |
| `sforge init <name> --template <t>`       | Scaffold a standalone Soroban project from a template.  |
| `sforge templates`                        | List available templates.                               |
| `sforge build`                            | Compile contracts to optimized WASM.                    |
| `sforge test`                             | Run the contract unit tests.                            |
| `sforge deploy --wasm --source --network` | Deploy a built WASM to a network.                       |

## Templates

Each template is a **real, tested Soroban contract** — `sforge init` copies it,
pins the SDK, and makes it a standalone crate ready to build.

| Template  | Description                                                        |
| --------- | ----------------------------------------------------------------- |
| `counter` | A minimal counter — storage, auth, an event, and a unit test.     |
| `escrow`  | A two-party token escrow — init / release / refund, 4 unit tests. |

See [`docs/templates.md`](docs/templates.md) and [`docs/usage.md`](docs/usage.md).

## How it works

`sforge init` copies a template from `templates/`, rewrites the crate name, pins
`soroban-sdk`, and adds an optimized release profile — producing a project that
compiles and tests on its own. `build`/`test`/`deploy` shell out to the Stellar
CLI and cargo so you get one consistent workflow.

## Tech stack

| Layer     | Technology                                             |
| --------- | ------------------------------------------------------ |
| CLI       | TypeScript · commander · Node 20+                      |
| Templates | Rust · Soroban SDK 22 · `wasm32v1-none`                |
| Tooling   | pnpm workspace · GitHub Actions · Conventional Commits |

## Project structure

| Path                 | Description                            |
| -------------------- | -------------------------------------- |
| `packages/cli/`      | The `sforge` CLI (TypeScript) + tests. |
| `templates/counter/` | Counter starter contract.              |
| `templates/escrow/`  | Escrow starter contract.               |
| `docs/`              | Usage and template reference.          |

## Contributing & Stellar Wave

StellarForge participates in the **Stellar Wave Program** via
[Drips](https://www.drips.network/). Pick up an issue labeled **`Stellar Wave`**
or **`good first issue`** — adding a new template is a great first contribution.
Start with [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT — see [LICENSE](LICENSE).
