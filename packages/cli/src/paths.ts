import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

/** Locate the bundled `templates/` directory, whether running from src or dist. */
export function templatesDir(): string {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.resolve(here, '../templates'), // packaged (templates copied into the package)
    path.resolve(here, '../../templates'),
    path.resolve(here, '../../../templates'), // monorepo: packages/cli/{src,dist} -> repo/templates
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  throw new Error('Could not locate the templates directory.');
}

/** List available template names (directories containing a Cargo.toml). */
export function availableTemplates(): string[] {
  const dir = templatesDir();
  return fs
    .readdirSync(dir)
    .filter((t) => fs.existsSync(path.join(dir, t, 'Cargo.toml')))
    .sort();
}
