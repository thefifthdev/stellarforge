# StellarForge 🔧

> The professional developer CLI and scaffolding toolkit for Soroban smart contracts on Stellar.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Stellar](https://img.shields.io/badge/Built%20on-Stellar-black)](https://stellar.org)
[![Soroban](https://img.shields.io/badge/Soroban-Smart%20Contracts-purple)](https://soroban.stellar.org)
[![Status](https://img.shields.io/badge/Status-Active%20Development-green)]()

---

## The Problem

Building on Soroban today means stitching together a fragmented set of tools — manual contract initialization, no standardized project structure, custom deployment scripts for every team, and near-zero testing scaffolding out of the box. Developers waste days on setup before writing a single line of contract logic.

Ethereum has Hardhat and Foundry. Solana has Anchor. **Stellar has nothing like it — until now.**

---

## What is StellarForge?

StellarForge is a batteries-included CLI and SDK scaffold that gives Stellar developers a single, opinionated tool to build, test, deploy, and verify Soroban smart contracts from end to end.

Think of it as your Stellar development command center: one tool, zero ceremony, production-ready from day one.

---

## Core Features

### `sforge init`
Scaffold a new Soroban project with best-practice structure, pre-configured `Cargo.toml`, test harness, and deployment manifest — in under 30 seconds.

```bash
sforge init my-escrow-contract --template escrow
cd my-escrow-contract
```

### `sforge build`
Compile Soroban contracts to WASM with optimized output and ABI generation in one command.

```bash
sforge build --optimize
# Output: ./target/wasm32-unknown-unknown/release/my_contract.wasm
# ABI:    ./artifacts/my_contract.json
```

### `sforge test`
Run the full test suite against an embedded local Soroban environment — no external dependencies required.

```bash
sforge test --verbose
sforge test --coverage
```

### `sforge devnet`
Spin up a local Stellar devnet with pre-funded accounts and deployed test contracts in seconds.

```bash
sforge devnet start
sforge devnet fund --account alice --xlm 10000
sforge devnet status
```

### `sforge deploy`
Deploy contracts to testnet or mainnet with automatic network switching, fee estimation, and deployment receipts.

```bash
sforge deploy --network testnet
sforge deploy --network mainnet --confirm
```

### `sforge verify`
Verify deployed contract source code against on-chain bytecode and publish to the Stellar contract registry.

```bash
sforge verify --contract-id CXXX... --source ./src
```

### `sforge inspect`
Inspect any deployed Soroban contract — read its ABI, state, and call history directly from the chain.

```bash
sforge inspect CXXX...
sforge inspect CXXX... --function transfer --args '["alice", 1000]'
```

---

## Project Structure (Generated)

```
my-contract/
├── src/
│   └── lib.rs              # Contract logic
├── tests/
│   └── integration.rs      # Integration tests
├── artifacts/
│   └── my_contract.json    # Generated ABI
├── scripts/
│   ├── deploy.sh           # Deployment scripts
│   └── setup-devnet.sh     # Local environment setup
├── forge.config.toml       # StellarForge configuration
└── Cargo.toml
```

---

## Quick Start

### Installation

```bash
# Via cargo
cargo install stellarforge

# Via npm (wrapper)
npm install -g @stellarforge/cli

# Verify installation
sforge --version
```

### Your First Contract in 5 Minutes

```bash
# 1. Scaffold a new project
sforge init hello-stellar --template token

# 2. Start a local devnet
sforge devnet start

# 3. Build and test
sforge build && forge test

# 4. Deploy to testnet
sforge deploy --network testnet

# 5. Inspect the deployed contract
sforge inspect $CONTRACT_ID
```

---

## Templates

StellarForge ships with production-ready templates for the most common Soroban patterns:

| Template | Description |
|---|---|
| `token` | SEP-41 compliant fungible token |
| `escrow` | Time-locked escrow with dispute resolution |
| `multisig` | M-of-N multisignature authorization |
| `vesting` | Token vesting schedule with cliff |
| `dao` | Basic governance with proposal voting |
| `nft` | Non-fungible token (SEP-NFT draft) |
| `blank` | Minimal contract skeleton |

```bash
sforge init my-project --template escrow
sforge list-templates  # Browse all available templates
```

---

## Configuration (`forge.config.toml`)

```toml
[project]
name = "my-contract"
version = "0.1.0"
soroban_version = "21"

[networks.testnet]
rpc_url = "https://soroban-testnet.stellar.org"
network_passphrase = "Test SDF Network ; September 2015"
funded_accounts = ["alice", "bob"]

[networks.mainnet]
rpc_url = "https://soroban-mainnet.stellar.org"
network_passphrase = "Public Global Stellar Network ; September 2015"

[deploy]
optimize = true
gas_buffer = 1.2
auto_verify = true
```

---

## SDK Integration

StellarForge also ships a lightweight TypeScript SDK for frontend integration, auto-generated from your contract ABI.

```typescript
import { StellarForge } from '@stellarforge/sdk';

const sforge = new StellarForge({ network: 'testnet' });

// Auto-typed client from your contract ABI
const contract = await sforge.loadContract('CXXX...');

// Call contract functions with full type safety
const result = await contract.transfer({
  from: 'alice',
  to: 'bob',
  amount: BigInt(1000),
});

console.log(result.hash); // tx hash
```

---

## Why StellarForge?

| Feature | StellarForge | Manual Setup |
|---|---|---|
| Project scaffold | ✅ `forge init` | ❌ Hours of setup |
| Local devnet | ✅ One command | ❌ Manual Docker config |
| Test runner | ✅ Built-in | ❌ Custom harness |
| Deploy pipeline | ✅ Automated | ❌ Custom scripts |
| Contract verification | ✅ `forge verify` | ❌ Not standardized |
| ABI generation | ✅ Automatic | ❌ Manual |
| TypeScript SDK gen | ✅ Auto-generated | ❌ Hand-written |

---

## Roadmap

- [ ] `sforge audit` — Static analysis and security checks for Soroban contracts
- [ ] VS Code extension — IntelliSense for Soroban + StellarForge
- [ ] Contract registry — Public searchable index of verified Soroban contracts
- [ ] `sforge upgrade` — Safe contract upgrade management with migration scripts
- [ ] GitHub Actions integration — CI/CD templates for Stellar projects
- [ ] Multi-contract workspace support

---

## Contributing

StellarForge is open source and actively seeking contributors. We follow the [Stellar Contribution Guidelines](https://github.com/stellar/.github/blob/master/CONTRIBUTING.md).

```bash
git clone https://github.com/your-org/stellarforge
cd stellarforge
cargo build
cargo test
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for issue labels, complexity levels, and how to get started. Good first issues are tagged `good-first-issue`.

---

## License

MIT © StellarForge Contributors

---

*Built for the Stellar ecosystem. Powered by Soroban. Maintained with ❤️ by the community.*
