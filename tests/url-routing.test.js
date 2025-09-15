/**
 * URL Structure Validation Test
 * 
 * This test validates the URL structure follows the hierarchical pattern.
 * EXPECTED TO FAIL initially until URL rewrites are implemented (T033).
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const configPath = path.join(__dirname, '../docs/.vitepress/config.ts');

describe('URL Structure Validation', () => {
  let configContent;
  
  beforeAll(() => {
    configContent = fs.readFileSync(configPath, 'utf-8');
  });

  it('should have URL rewrite rules configured', () => {
    // This will FAIL initially - no rewrites configured yet
    expect(configContent).toMatch(/rewrites:\s*{/);
  });

  it('should redirect /basics/* to /resources/tutorials/basics/*', () => {
    // This will FAIL initially
    expect(configContent).toMatch(/'basics\/\(\.\*\)':\s*'resources\/tutorials\/basics\/\$1'/);
  });

  it('should redirect /faq/* to /resources/tutorials/faq/*', () => {
    // This will FAIL initially  
    expect(configContent).toMatch(/'faq\/\(\.\*\)':\s*'resources\/tutorials\/faq\/\$1'/);
  });

  it('should redirect /risk-management/* to /resources/personal-finance-tips/risk-management/*', () => {
    // This will FAIL initially
    expect(configContent).toMatch(/'risk-management\/\(\.\*\)':\s*'resources\/personal-finance-tips\/risk-management\/\$1'/);
  });

  it('should redirect /tools/* to /resources/useful-links/tools/*', () => {
    // This will FAIL initially
    expect(configContent).toMatch(/'tools\/\(\.\*\)':\s*'resources\/useful-links\/tools\/\$1'/);
  });

  it('should redirect /advanced-strategies/* to /insights/trading-strategy/advanced/*', () => {
    // This will FAIL initially
    expect(configContent).toMatch(/'advanced-strategies\/\(\.\*\)':\s*'insights\/trading-strategy\/advanced\/\$1'/);
  });

  describe('Directory Structure Validation', () => {
    const docsPath = path.join(__dirname, '../docs');

    it('should have /insights/market-analysis/ directory', () => {
      // This will PASS - we created the directories
      const dirPath = path.join(docsPath, 'insights/market-analysis');
      expect(fs.existsSync(dirPath)).toBe(true);
    });

    it('should have /insights/trading-strategy/ directory', () => {
      // This will PASS - we created the directories
      const dirPath = path.join(docsPath, 'insights/trading-strategy');
      expect(fs.existsSync(dirPath)).toBe(true);
    });

    it('should have /resources/personal-finance-tips/ directory', () => {
      // This will PASS - we created the directories
      const dirPath = path.join(docsPath, 'resources/personal-finance-tips');
      expect(fs.existsSync(dirPath)).toBe(true);
    });

    it('should have /resources/tutorials/ directory', () => {
      // This will PASS - we created the directories
      const dirPath = path.join(docsPath, 'resources/tutorials');
      expect(fs.existsSync(dirPath)).toBe(true);
    });

    it('should have /resources/useful-links/ directory', () => {
      // This will PASS - we created the directories
      const dirPath = path.join(docsPath, 'resources/useful-links');
      expect(fs.existsSync(dirPath)).toBe(true);
    });
  });

  describe('Multi-language URL Structure', () => {
    const docsPath = path.join(__dirname, '../docs');

    it('should have Spanish insights directory structure', () => {
      // This will PASS - we created the directories
      const dirPath = path.join(docsPath, 'es/insights');
      expect(fs.existsSync(dirPath)).toBe(true);
    });

    it('should have Spanish resources directory structure', () => {
      // This will PASS - we created the directories  
      const dirPath = path.join(docsPath, 'es/resources');
      expect(fs.existsSync(dirPath)).toBe(true);
    });

    it('should have Chinese insights directory structure', () => {
      // This will PASS - we created the directories
      const dirPath = path.join(docsPath, 'zh/insights');
      expect(fs.existsSync(dirPath)).toBe(true);
    });

    it('should have Chinese resources directory structure', () => {
      // This will PASS - we created the directories
      const dirPath = path.join(docsPath, 'zh/resources');
      expect(fs.existsSync(dirPath)).toBe(true);
    });
  });
});
