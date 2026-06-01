.PHONY: install build dev test lint templates-test templates-fmt templates-clippy link clean

# StellarForge entrypoints.
# Prerequisites: Node.js 20+, pnpm, Rust + the Stellar CLI (for sforge build/deploy).

install:
	pnpm install

build:
	pnpm build

dev:
	pnpm dev

test:
	pnpm test

lint:
	pnpm lint

# Link `sforge` globally for local use after building.
link: build
	cd packages/cli && npm link

# ---- Template contracts ----

templates-test:
	cargo test

templates-fmt:
	cargo fmt --check

templates-clippy:
	cargo clippy --all-targets -- -D warnings

clean:
	cargo clean
	rm -rf node_modules packages/*/node_modules packages/*/dist
