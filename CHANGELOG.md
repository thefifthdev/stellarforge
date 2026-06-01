# Changelog

All notable changes to this project are documented here. The format is based on
[Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres
to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- 🔧 `sforge` CLI (TypeScript / commander): `init`, `templates`, `build`, `test`,
  and `deploy` commands. `init` scaffolds a standalone Soroban crate (pins the SDK,
  adds a release profile); `build`/`test`/`deploy` wrap the Stellar CLI and cargo.
- ⛓ Two starter templates — `counter` and `escrow` — as real, tested Soroban
  contracts (5 contract tests total).
- 🧪 CLI unit tests (vitest) covering scaffolding, validation, and template listing.
- 📖 Usage and template-reference docs.
- 🔧 CI: template contract checks (fmt/clippy/test + WASM build) and CLI checks
  (lint/test/build), plus full contribution infrastructure.
