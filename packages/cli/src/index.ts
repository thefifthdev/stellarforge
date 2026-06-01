#!/usr/bin/env node
import { Command } from 'commander';
import { runInit } from './commands/init.js';
import { runBuild, runTest, runDeploy } from './commands/run.js';
import { availableTemplates } from './paths.js';

const program = new Command();

program
  .name('sforge')
  .description('The developer CLI and scaffolding toolkit for Soroban smart contracts.')
  .version('0.1.0');

program
  .command('init')
  .description('Scaffold a new Soroban project from a template')
  .argument('<name>', 'project directory name')
  .option('-t, --template <template>', 'template to use', 'counter')
  .action((name: string, opts: { template: string }) => {
    try {
      const res = runInit(name, { template: opts.template });
      console.log(`✓ Created ${res.crateName} in ${res.targetDir}`);
      console.log(`  ${res.files.length} files from the "${opts.template}" template.`);
      console.log(`\nNext:\n  cd ${name}\n  sforge build\n  sforge test`);
    } catch (err) {
      fail(err);
    }
  });

program
  .command('templates')
  .description('List available templates')
  .action(() => {
    for (const t of availableTemplates()) console.log(`- ${t}`);
  });

program
  .command('build')
  .description('Compile the contract(s) to optimized WASM (wraps `stellar contract build`)')
  .action(() => process.exit(runBuild()));

program
  .command('test')
  .description('Run the contract unit tests (wraps `cargo test`)')
  .action(() => process.exit(runTest()));

program
  .command('deploy')
  .description('Deploy a built WASM to a network (wraps `stellar contract deploy`)')
  .requiredOption('--wasm <path>', 'path to the .wasm artifact')
  .requiredOption('--source <identity>', 'funded signing identity')
  .option('--network <network>', 'target network', 'testnet')
  .action((opts: { wasm: string; source: string; network: string }) => {
    process.exit(runDeploy(opts));
  });

program.parseAsync();

function fail(err: unknown): never {
  console.error(`✖ ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
}
