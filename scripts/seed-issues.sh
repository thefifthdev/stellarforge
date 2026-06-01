#!/usr/bin/env bash
# Seed StellarForge's contributor backlog as labeled GitHub issues.
# Requires the GitHub CLI authenticated against the repo. Run once on a fresh repo.
set -euo pipefail

REPO="${REPO:-thefifthdev/stellarforge}"

ensure_label() {
  gh label create "$1" --repo "$REPO" --color "$2" --description "$3" 2>/dev/null || true
}

ensure_label "Stellar Wave"     "7c5cff" "Eligible for Stellar Wave / Drips contributor rewards"
ensure_label "good first issue" "2dd4bf" "Good for newcomers"
ensure_label "area: cli"        "1d76db" "The sforge CLI"
ensure_label "area: templates"  "5319e7" "Starter contract templates"
ensure_label "area: docs"       "d4c5f9" "Documentation"

issue() {
  local title="$1" labels="$2" body="$3"
  echo "Creating: $title"
  gh issue create --repo "$REPO" --title "$title" --label "$labels" --body "$body"
}

issue "feat(templates): add a SEP-41 fungible token template" \
  "Stellar Wave,area: templates" \
  $'## Acceptance criteria\n- [ ] templates/token with mint/transfer/allowance\n- [ ] Unit tests\n- [ ] Listed by `sforge templates`'

issue "feat(templates): add an NFT (SEP-?) template" \
  "Stellar Wave,area: templates" \
  $'## Acceptance criteria\n- [ ] templates/nft with mint/transfer/ownership\n- [ ] Unit tests'

issue "feat(templates): add a multisig/DAO template" \
  "area: templates" \
  $'## Acceptance criteria\n- [ ] M-of-N proposal/approve/execute\n- [ ] Tests'

issue "feat(cli): \`sforge devnet\` — local quickstart network" \
  "Stellar Wave,area: cli" \
  $'## Problem\nDevelopers want a one-command local network with funded accounts.\n\n## Acceptance criteria\n- [ ] start/stop a local network\n- [ ] fund test accounts'

issue "feat(cli): \`sforge verify\` — verify a deployed contract matches local WASM" \
  "Stellar Wave,area: cli" \
  $'## Acceptance criteria\n- [ ] Hash local WASM and compare to the on-chain code'

issue "feat(cli): \`sforge bindings\` — generate typed TS bindings" \
  "area: cli" \
  $'## Acceptance criteria\n- [ ] Wrap `stellar contract bindings typescript`\n- [ ] Output into a package'

issue "feat(cli): interactive \`sforge init\` (prompt for template)" \
  "good first issue,area: cli" \
  $'## Acceptance criteria\n- [ ] When --template is omitted, prompt with the template list'

issue "feat(cli): \`--list\` json output for \`sforge templates\`" \
  "good first issue,area: cli" \
  $'## Acceptance criteria\n- [ ] `sforge templates --json` prints machine-readable output'

issue "test(cli): e2e test that init→build→test succeeds in CI" \
  "Stellar Wave,area: cli" \
  $'## Acceptance criteria\n- [ ] CI scaffolds a template and runs cargo test on it'

issue "feat(cli): post-init git init + first commit option" \
  "good first issue,area: cli" \
  $'## Acceptance criteria\n- [ ] `sforge init --git` initializes a repo with an initial commit'

issue "docs: record an asciinema demo of the init→deploy flow" \
  "good first issue,area: docs" \
  $'## Acceptance criteria\n- [ ] Short terminal recording embedded in the README'

issue "feat(templates): template metadata (sforge.json) with descriptions" \
  "area: templates" \
  $'## Acceptance criteria\n- [ ] Each template carries a description\n- [ ] `sforge templates` shows it'

echo "Done. Seeded contributor issues on $REPO."
