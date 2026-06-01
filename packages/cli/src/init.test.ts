import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { runInit } from './commands/init.js';
import { availableTemplates } from './paths.js';

let tmp: string;

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sforge-'));
});

afterEach(() => {
  fs.rmSync(tmp, { recursive: true, force: true });
});

describe('availableTemplates', () => {
  it('includes counter and escrow', () => {
    const t = availableTemplates();
    expect(t).toContain('counter');
    expect(t).toContain('escrow');
  });
});

describe('runInit', () => {
  it('scaffolds a standalone crate from the counter template', () => {
    const res = runInit('my-thing', { template: 'counter', cwd: tmp });
    const cargo = fs.readFileSync(path.join(res.targetDir, 'Cargo.toml'), 'utf8');
    expect(res.crateName).toBe('my_thing');
    expect(cargo).toContain('name = "my_thing"');
    expect(cargo).toContain('soroban-sdk = "22.0.0"');
    expect(cargo).not.toContain('workspace = true');
    expect(cargo).toContain('[profile.release]');
    expect(fs.existsSync(path.join(res.targetDir, 'src/lib.rs'))).toBe(true);
    expect(fs.existsSync(path.join(res.targetDir, 'README.md'))).toBe(true);
  });

  it('pins testutils for the escrow template', () => {
    const res = runInit('esc', { template: 'escrow', cwd: tmp });
    const cargo = fs.readFileSync(path.join(res.targetDir, 'Cargo.toml'), 'utf8');
    expect(cargo).toContain('features = ["testutils"]');
    expect(cargo).toContain('version = "22.0.0"');
  });

  it('rejects an unknown template', () => {
    expect(() => runInit('x', { template: 'nope', cwd: tmp })).toThrow(/Unknown template/);
  });

  it('refuses to overwrite an existing directory', () => {
    fs.mkdirSync(path.join(tmp, 'dup'));
    expect(() => runInit('dup', { template: 'escrow', cwd: tmp })).toThrow(/already exists/);
  });
});
