/**
 * Content Accessibility Validation Test
 * 
 * This test validates that all existing content is accessible in new locations.
 * EXPECTED TO FAIL initially until content migration is complete (T017-T021).
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const docsPath = path.join(__dirname, '../docs');

describe('Content Migration Validation', () => {

  describe('Tutorials Content Migration', () => {
    const tutorialsPath = path.join(docsPath, 'resources/tutorials');

    it('should have basics content in new location', () => {
      // This will FAIL initially - content not moved yet
      const basicsPath = path.join(tutorialsPath, 'basics');
      expect(fs.existsSync(basicsPath)).toBe(true);
      
      // Check for key files
      expect(fs.existsSync(path.join(basicsPath, 'what-is-contract-trading.md'))).toBe(true);
      expect(fs.existsSync(path.join(basicsPath, 'contract-types.md'))).toBe(true);
      expect(fs.existsSync(path.join(basicsPath, 'leverage-and-margin.md'))).toBe(true);
      expect(fs.existsSync(path.join(basicsPath, 'choosing-platform.md'))).toBe(true);
    });

    it('should have FAQ content in new location', () => {
      // This will FAIL initially - content not moved yet
      const faqPath = path.join(tutorialsPath, 'faq');
      expect(fs.existsSync(faqPath)).toBe(true);
      
      // Check for key files
      expect(fs.existsSync(path.join(faqPath, 'general.md'))).toBe(true);
      expect(fs.existsSync(path.join(faqPath, 'technical.md'))).toBe(true);
      expect(fs.existsSync(path.join(faqPath, 'platform.md'))).toBe(true);
      expect(fs.existsSync(path.join(faqPath, 'trading.md'))).toBe(true);
    });
  });

  describe('Personal Finance Tips Content Migration', () => {
    const financePathPath = path.join(docsPath, 'resources/personal-finance-tips');

    it('should have risk management content in new location', () => {
      // This will FAIL initially - content not moved yet
      const riskMgmtPath = path.join(financePathPath, 'risk-management');
      expect(fs.existsSync(riskMgmtPath)).toBe(true);
      
      // Check for key files
      expect(fs.existsSync(path.join(riskMgmtPath, 'basics.md'))).toBe(true);
      expect(fs.existsSync(path.join(riskMgmtPath, 'position-sizing.md'))).toBe(true);
      expect(fs.existsSync(path.join(riskMgmtPath, 'risk-reward.md'))).toBe(true);
      expect(fs.existsSync(path.join(riskMgmtPath, 'stop-loss.md'))).toBe(true);
    });
  });

  describe('Useful Links Content Migration', () => {
    const usefulLinksPath = path.join(docsPath, 'resources/useful-links');

    it('should have tools content in new location', () => {
      // This will FAIL initially - content not moved yet
      const toolsPath = path.join(usefulLinksPath, 'tools');
      expect(fs.existsSync(toolsPath)).toBe(true);
      
      // Check for key files
      expect(fs.existsSync(path.join(toolsPath, 'calculator.md'))).toBe(true);
      expect(fs.existsSync(path.join(toolsPath, 'glossary.md'))).toBe(true);
      expect(fs.existsSync(path.join(toolsPath, 'risk-calculator.md'))).toBe(true);
    });
  });

  describe('Trading Strategy Content Migration', () => {
    const tradingStrategyPath = path.join(docsPath, 'insights/trading-strategy');

    it('should have advanced strategies content in new location', () => {
      // This will FAIL initially - content not moved yet
      const advancedPath = path.join(tradingStrategyPath, 'advanced');
      expect(fs.existsSync(advancedPath)).toBe(true);
      
      // Check for key files
      expect(fs.existsSync(path.join(advancedPath, 'index.md'))).toBe(true);
    });
  });

  describe('Index Pages Creation', () => {
    it('should have insights index page', () => {
      // This will FAIL initially - index pages not created yet
      const indexPath = path.join(docsPath, 'insights/index.md');
      expect(fs.existsSync(indexPath)).toBe(true);
    });

    it('should have market analysis index page', () => {
      // This will FAIL initially - index pages not created yet
      const indexPath = path.join(docsPath, 'insights/market-analysis/index.md');
      expect(fs.existsSync(indexPath)).toBe(true);
    });

    it('should have trading strategy index page', () => {
      // This will FAIL initially - index pages not created yet
      const indexPath = path.join(docsPath, 'insights/trading-strategy/index.md');
      expect(fs.existsSync(indexPath)).toBe(true);
    });

    it('should have resources index page', () => {
      // This will FAIL initially - index pages not created yet
      const indexPath = path.join(docsPath, 'resources/index.md');
      expect(fs.existsSync(indexPath)).toBe(true);
    });

    it('should have personal finance tips index page', () => {
      // This will FAIL initially - index pages not created yet
      const indexPath = path.join(docsPath, 'resources/personal-finance-tips/index.md');
      expect(fs.existsSync(indexPath)).toBe(true);
    });

    it('should have tutorials index page', () => {
      // This will FAIL initially - index pages not created yet
      const indexPath = path.join(docsPath, 'resources/tutorials/index.md');
      expect(fs.existsSync(indexPath)).toBe(true);
    });

    it('should have useful links index page', () => {
      // This will FAIL initially - index pages not created yet
      const indexPath = path.join(docsPath, 'resources/useful-links/index.md');
      expect(fs.existsSync(indexPath)).toBe(true);
    });
  });

  describe('Original Content Preservation', () => {
    it('should preserve all content from original basics directory', () => {
      // This test ensures no content is lost during migration
      const originalBasicsPath = path.join(docsPath, 'basics');
      const newBasicsPath = path.join(docsPath, 'resources/tutorials/basics');
      
      if (fs.existsSync(originalBasicsPath) && fs.existsSync(newBasicsPath)) {
        const originalFiles = fs.readdirSync(originalBasicsPath).filter(f => f.endsWith('.md'));
        const newFiles = fs.readdirSync(newBasicsPath).filter(f => f.endsWith('.md'));
        
        // All original files should exist in new location
        originalFiles.forEach(file => {
          expect(newFiles).toContain(file);
        });
      } else {
        // If migration is complete, original might not exist, but new should
        expect(fs.existsSync(newBasicsPath)).toBe(true);
      }
    });

    it('should preserve all content from original FAQ directory', () => {
      const originalFaqPath = path.join(docsPath, 'faq');
      const newFaqPath = path.join(docsPath, 'resources/tutorials/faq');
      
      if (fs.existsSync(originalFaqPath) && fs.existsSync(newFaqPath)) {
        const originalFiles = fs.readdirSync(originalFaqPath).filter(f => f.endsWith('.md'));
        const newFiles = fs.readdirSync(newFaqPath).filter(f => f.endsWith('.md'));
        
        originalFiles.forEach(file => {
          expect(newFiles).toContain(file);
        });
      } else {
        expect(fs.existsSync(newFaqPath)).toBe(true);
      }
    });

    it('should preserve all content from original risk-management directory', () => {
      const originalRiskPath = path.join(docsPath, 'risk-management');
      const newRiskPath = path.join(docsPath, 'resources/personal-finance-tips/risk-management');
      
      if (fs.existsSync(originalRiskPath) && fs.existsSync(newRiskPath)) {
        const originalFiles = fs.readdirSync(originalRiskPath).filter(f => f.endsWith('.md'));
        const newFiles = fs.readdirSync(newRiskPath).filter(f => f.endsWith('.md'));
        
        originalFiles.forEach(file => {
          expect(newFiles).toContain(file);
        });
      } else {
        expect(fs.existsSync(newRiskPath)).toBe(true);
      }
    });

    it('should preserve all content from original tools directory', () => {
      const originalToolsPath = path.join(docsPath, 'tools');
      const newToolsPath = path.join(docsPath, 'resources/useful-links/tools');
      
      if (fs.existsSync(originalToolsPath) && fs.existsSync(newToolsPath)) {
        const originalFiles = fs.readdirSync(originalToolsPath).filter(f => f.endsWith('.md'));
        const newFiles = fs.readdirSync(newToolsPath).filter(f => f.endsWith('.md'));
        
        originalFiles.forEach(file => {
          expect(newFiles).toContain(file);
        });
      } else {
        expect(fs.existsSync(newToolsPath)).toBe(true);
      }
    });
  });
});
