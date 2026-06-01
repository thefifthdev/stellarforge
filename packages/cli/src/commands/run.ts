import { spawnSync } from 'node:child_process';

/** Run a command, streaming output; returns the exit code. */
function exec(cmd: string, args: string[]): number {
  const res = spawnSync(cmd, args, { stdio: 'inherit' });
  if (res.error) {
    if ((res.error as NodeJS.ErrnoException).code === 'ENOENT') {
      console.error(`\n✖ "${cmd}" not found. Is it installed and on your PATH?`);
      return 127;
    }
    throw res.error;
  }
  return res.status ?? 1;
}

/** `sforge build` — compile the contract(s) to optimized WASM. */
export function runBuild(): number {
  return exec('stellar', ['contract', 'build']);
}

/** `sforge test` — run the Rust unit tests. */
export function runTest(): number {
  return exec('cargo', ['test']);
}

/** `sforge deploy` — deploy the built WASM to a network. */
export function runDeploy(opts: { wasm: string; source: string; network: string }): number {
  return exec('stellar', [
    'contract',
    'deploy',
    '--wasm',
    opts.wasm,
    '--source',
    opts.source,
    '--network',
    opts.network,
  ]);
}
