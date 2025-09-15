/**
 * Multi-language Navigation Test
 * 
 * This test validates multi-language navigation structure.
 * EXPECTED TO FAIL initially until i18n updates are applied.
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const docsPath = path.join(__dirname, '../docs');

describe('Multi-language Navigation Validation', () => {
  
  describe('Spanish Content Structure', () => {
    it('should have Spanish insights directory with content', () => {
      // This will FAIL initially - content not migrated yet
      const esInsightsPath = path.join(docsPath, 'es/insights');
      expect(fs.existsSync(esInsightsPath)).toBe(true);
      
      // Should have index page
      expect(fs.existsSync(path.join(esInsightsPath, 'index.md'))).toBe(true);
    });

    it('should have Spanish resources directory with content', () => {
      // This will FAIL initially - content not migrated yet
      const esResourcesPath = path.join(docsPath, 'es/resources');
      expect(fs.existsSync(esResourcesPath)).toBe(true);
      
      // Should have index page
      expect(fs.existsSync(path.join(esResourcesPath, 'index.md'))).toBe(true);
    });

    it('should have migrated Spanish basics content', () => {
      // This will FAIL initially
      const esBasicsPath = path.join(docsPath, 'es/resources/tutorials/basics');
      expect(fs.existsSync(esBasicsPath)).toBe(true);
    });

    it('should have migrated Spanish FAQ content', () => {
      // This will FAIL initially
      const esFaqPath = path.join(docsPath, 'es/resources/tutorials/faq');
      expect(fs.existsSync(esFaqPath)).toBe(true);
    });
  });

  describe('Chinese Content Structure', () => {
    it('should have Chinese insights directory with content', () => {
      // This will FAIL initially - content not migrated yet
      const zhInsightsPath = path.join(docsPath, 'zh/insights');
      expect(fs.existsSync(zhInsightsPath)).toBe(true);
      
      // Should have index page
      expect(fs.existsSync(path.join(zhInsightsPath, 'index.md'))).toBe(true);
    });

    it('should have Chinese resources directory with content', () => {
      // This will FAIL initially - content not migrated yet
      const zhResourcesPath = path.join(docsPath, 'zh/resources');
      expect(fs.existsSync(zhResourcesPath)).toBe(true);
      
      // Should have index page
      expect(fs.existsSync(path.join(zhResourcesPath, 'index.md'))).toBe(true);
    });

    it('should have migrated Chinese basics content', () => {
      // This will FAIL initially
      const zhBasicsPath = path.join(docsPath, 'zh/resources/tutorials/basics');
      expect(fs.existsSync(zhBasicsPath)).toBe(true);
    });

    it('should have migrated Chinese FAQ content', () => {
      // This will FAIL initially
      const zhFaqPath = path.join(docsPath, 'zh/resources/tutorials/faq');
      expect(fs.existsSync(zhFaqPath)).toBe(true);
    });
  });

  describe('Language Switcher Configuration', () => {
    const configPath = path.join(__dirname, '../docs/.vitepress/config.ts');
    let configContent;
    
    beforeAll(() => {
      configContent = fs.readFileSync(configPath, 'utf-8');
    });

    it('should have locales configuration preserved', () => {
      // This should PASS - locales config should remain
      expect(configContent).toMatch(/locales:\s*{/);
    });

    it('should have English locale configured', () => {
      // This should PASS
      expect(configContent).toMatch(/root:\s*{[\s\S]*label:\s*['"]English['"]/);
    });

    it('should have Chinese locale configured', () => {
      // This should PASS
      expect(configContent).toMatch(/zh:\s*{[\s\S]*label:\s*['"]中文['"]/);
    });

    it('should have Spanish locale configured', () => {
      // This should PASS
      expect(configContent).toMatch(/es:\s*{[\s\S]*label:\s*['"]Español['"]/);
    });
  });
});
