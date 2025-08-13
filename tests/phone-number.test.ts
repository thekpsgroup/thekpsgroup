import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'fs';
import path from 'path';
import { CONTACT } from '../src/constants/contact';

function walk(dir: string, files: string[] = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.git') continue;
    const full = path.join(dir, entry);
    const stats = statSync(full);
    if (stats.isDirectory()) walk(full, files);
    else files.push(full);
  }
  return files;
}

describe('phone number', () => {
  it('contains only the standard phone number', () => {
    const files = walk(path.resolve('.'));
    const regex = /\d{3}-\d{3}-\d{4}/g;
    const bad: string[] = [];
    for (const file of files) {
      const content = readFileSync(file, 'utf8');
      let match;
      while ((match = regex.exec(content))) {
        if (match[0] !== CONTACT.phoneRaw) {
          bad.push(`${file}:${match[0]}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});
