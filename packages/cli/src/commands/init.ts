import fs from 'node:fs';
import path from 'node:path';
import { templatesDir, availableTemplates } from '../paths.js';

const SDK_VERSION = '22.0.0';

const RELEASE_PROFILE = `
[profile.release]
opt-level = "z"
overflow-checks = true
debug = 0
strip = "symbols"
debug-assertions = false
panic = "abort"
codegen-units = 1
lto = true
`;

export interface InitOptions {
  template: string;
  cwd?: string;
}

export interface InitResult {
  targetDir: string;
  crateName: string;
  files: string[];
}

/** Scaffold a new standalone Soroban project from a template. */
export function runInit(name: string, opts: InitOptions): InitResult {
  const cwd = opts.cwd ?? process.cwd();
  const templates = availableTemplates();
  if (!templates.includes(opts.template)) {
    throw new Error(`Unknown template "${opts.template}". Available: ${templates.join(', ')}.`);
  }

  const crateName = sanitizeCrateName(name);
  const targetDir = path.resolve(cwd, name);
  if (fs.existsSync(targetDir)) {
    throw new Error(`Target directory already exists: ${targetDir}`);
  }

  const src = path.join(templatesDir(), opts.template);
  const files: string[] = [];
  copyDir(src, targetDir, files);

  // Make the copied crate standalone: pin the SDK and add a release profile.
  const cargoPath = path.join(targetDir, 'Cargo.toml');
  let cargo = fs.readFileSync(cargoPath, 'utf8');
  cargo = cargo
    .replace(/name = ".*"/, `name = "${crateName}"`)
    .replace(
      /soroban-sdk = \{ workspace = true, features = \["testutils"\] \}/g,
      `soroban-sdk = { version = "${SDK_VERSION}", features = ["testutils"] }`,
    )
    .replace(/soroban-sdk = \{ workspace = true \}/g, `soroban-sdk = "${SDK_VERSION}"`);
  if (!cargo.includes('[profile.release]')) {
    cargo += `\n${RELEASE_PROFILE.trimStart()}`;
  }
  fs.writeFileSync(cargoPath, cargo);

  // Helpful project files.
  fs.writeFileSync(path.join(targetDir, '.gitignore'), 'target/\n*.wasm\n.stellar/\n');
  fs.writeFileSync(
    path.join(targetDir, 'README.md'),
    `# ${name}\n\nScaffolded with [StellarForge](https://github.com/thefifthdev/stellarforge) — \`${opts.template}\` template.\n\n\`\`\`bash\nsforge build      # compile to WASM\nsforge test       # run unit tests\nsforge deploy --source <id> --network testnet\n\`\`\`\n`,
  );
  files.push('.gitignore', 'README.md');

  return { targetDir, crateName, files };
}

function sanitizeCrateName(name: string): string {
  return (
    path
      .basename(name)
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, '_')
      .replace(/^_+|_+$/g, '') || 'contract'
  );
}

function copyDir(src: string, dest: string, files: string[], rel = ''): void {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    if (entry.name === 'target' || entry.name === 'node_modules') continue;
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d, files, path.join(rel, entry.name));
    } else {
      fs.copyFileSync(s, d);
      files.push(path.join(rel, entry.name));
    }
  }
}
