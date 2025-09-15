/**
 * Legacy URL Redirect Validation Test
 * 
 * This test validates that legacy URLs redirect properly to new structure.
 * EXPECTED TO FAIL initially until redirects are implemented.
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const configPath = path.join(__dirname, '../docs/.vitepress/config.ts');

describe('Legacy URL Redirect Validation', () => {
  let configContent;
  
  beforeAll(() => {
    configContent = fs.readFileSync(configPath, 'utf-8');
  });

  it('should have redirect configuration block', () => {
    // This will FAIL initially - no rewrites configured yet
    expect(configContent).toMatch(/rewrites:\s*{/);
  });

  const redirectMappings = [
    { from: 'basics/(.*)', to: 'resources/tutorials/basics/$1' },
    { from: 'faq/(.*)', to: 'resources/tutorials/faq/$1' },
    { from: 'risk-management/(.*)', to: 'resources/personal-finance-tips/risk-management/$1' },
    { from: 'tools/(.*)', to: 'resources/useful-links/tools/$1' },
    { from: 'advanced-strategies/(.*)', to: 'insights/trading-strategy/advanced/$1' }
  ];

  redirectMappings.forEach(({ from, to }) => {
    it(`should redirect ${from} to ${to}`, () => {
      // This will FAIL initially - redirects not configured yet
      const escapedFrom = from.replace(/[().*]/g, '\\$&').replace(/\\\(\\\.\\\*\\\)/g, '\\(\\.*\\)');
      const regex = new RegExp(`'${escapedFrom}':\\s*'${to.replace(/\$/g, '\\$')}'`);
      expect(configContent).toMatch(regex);
    });
  });
});
