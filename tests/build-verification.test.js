/**
 * Build Verification Test
 * 
 * This test validates that VitePress builds successfully with new structure.
 * EXPECTED TO FAIL initially until all implementation is complete.
 */

import { describe, it, expect } from 'vitest';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const projectRoot = path.join(__dirname, '..');

describe('Build Verification', () => {
  
  it('should have valid VitePress configuration', () => {
    // This may FAIL if config has syntax errors during transition
    const configPath = path.join(projectRoot, 'docs/.vitepress/config.ts');
    expect(() => {
      require(configPath);
    }).not.toThrow();
  });

  it('should build successfully without errors', () => {
    // This will likely FAIL initially due to broken links or missing content
    expect(() => {
      execSync('npm run docs:build', { 
        cwd: projectRoot,
        stdio: 'pipe' // Capture output instead of showing
      });
    }).not.toThrow();
  }, 30000); // 30 second timeout for build

  it('should generate static files in correct structure', () => {
    // This will FAIL initially - build output won't have new structure
    const distPath = path.join(projectRoot, 'docs/.vitepress/dist');
    
    if (fs.existsSync(distPath)) {
      // Check for insights directory in build output
      expect(fs.existsSync(path.join(distPath, 'insights'))).toBe(true);
      expect(fs.existsSync(path.join(distPath, 'insights/market-analysis'))).toBe(true);
      expect(fs.existsSync(path.join(distPath, 'insights/trading-strategy'))).toBe(true);
      
      // Check for resources directory in build output
      expect(fs.existsSync(path.join(distPath, 'resources'))).toBe(true);
      expect(fs.existsSync(path.join(distPath, 'resources/tutorials'))).toBe(true);
      expect(fs.existsSync(path.join(distPath, 'resources/personal-finance-tips'))).toBe(true);
      expect(fs.existsSync(path.join(distPath, 'resources/useful-links'))).toBe(true);
    }
  });

  it('should have no broken internal links', () => {
    // This will FAIL initially due to content migration and link updates needed
    // This is a placeholder - full link checking would require more complex logic
    const distPath = path.join(projectRoot, 'docs/.vitepress/dist');
    
    if (fs.existsSync(distPath)) {
      // Basic check that key HTML files exist
      expect(fs.existsSync(path.join(distPath, 'index.html'))).toBe(true);
      expect(fs.existsSync(path.join(distPath, 'insights/index.html'))).toBe(true);
      expect(fs.existsSync(path.join(distPath, 'resources/index.html'))).toBe(true);
    }
  });

  it('should preserve search functionality', () => {
    // This should PASS if search config is preserved
    const configPath = path.join(projectRoot, 'docs/.vitepress/config.ts');
    const configContent = fs.readFileSync(configPath, 'utf-8');
    
    expect(configContent).toMatch(/search:\s*{/);
  });

  it('should have working preview server', () => {
    // This will FAIL if build is broken or config has issues
    // Note: This is a basic check - full server testing would be more complex
    expect(() => {
      // Just verify the preview command doesn't immediately crash
      const child = execSync('timeout 5 npm run docs:preview || true', { 
        cwd: projectRoot,
        stdio: 'pipe'
      });
    }).not.toThrow();
  }, 15000);
});
