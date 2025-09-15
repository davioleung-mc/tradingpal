/**
 * Navigation Structure Validation Test
 * 
 * This test validates the navigation configuration matches the new structure.
 * EXPECTED TO FAIL initially until navigation is updated (T029-T033).
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

// Load VitePress config
const configPath = path.join(__dirname, '../docs/.vitepress/config.ts');

describe('Navigation Structure Validation', () =>   {
  let configContent;
  
  beforeAll(() => {
    configContent = fs.readFileSync(configPath, 'utf-8');
  });

  it('should have exactly 2 top-level navigation items', () => {
    // This will FAIL initially - current nav has more items
    const navMatch = configContent.match(/nav:\s*\[([\s\S]*?)\]/);
    expect(navMatch).toBeTruthy();
    
    // Count top-level nav items (simplified parsing)
    const navContent = navMatch[1];
    const topLevelItems = navContent.split('{').length - 1;
    
    expect(topLevelItems).toBe(2); // Should have exactly "Insights" and "Resources"
  });

  it('should contain "Insights" navigation item', () => {
    // This will FAIL initially - "Insights" doesn't exist yet
    expect(configContent).toMatch(/text:\s*['"']Insights['"']/);
  });

  it('should contain "Resources" navigation item', () => {
    // This will FAIL initially - "Resources" doesn't exist yet
    expect(configContent).toMatch(/text:\s*['"']Resources['"']/);
  });

  it('should have Market Analysis under Insights', () => {
    // This will FAIL initially
    const insightsSection = extractNavSection(configContent, 'Insights');
    expect(insightsSection).toMatch(/Market Analysis/);
  });

  it('should have Trading Strategy under Insights', () => {
    // This will FAIL initially
    const insightsSection = extractNavSection(configContent, 'Insights');
    expect(insightsSection).toMatch(/Trading Strategy/);
  });

  it('should have Personal Finance Tips under Resources', () => {
    // This will FAIL initially
    const resourcesSection = extractNavSection(configContent, 'Resources');
    expect(resourcesSection).toMatch(/Personal Finance Tips/);
  });

  it('should have Tutorials under Resources', () => {
    // This will FAIL initially
    const resourcesSection = extractNavSection(configContent, 'Resources');
    expect(resourcesSection).toMatch(/Tutorials/);
  });

  it('should have Useful Links under Resources', () => {
    // This will FAIL initially
    const resourcesSection = extractNavSection(configContent, 'Resources');
    expect(resourcesSection).toMatch(/Useful Links/);
  });

  it('should NOT contain disclaimer in main navigation', () => {
    // This will FAIL initially - disclaimer is currently in nav
    expect(configContent).not.toMatch(/text:\s*['"'].*Disclaimer.*['"']/);
  });

  it('should NOT contain socialLinks configuration', () => {
    // This will PASS if no GitHub icon in nav, FAIL if present
    expect(configContent).not.toMatch(/socialLinks:\s*\[/);
  });

  it('should NOT have visible localeLinks (language switcher hidden)', () => {
    // This will FAIL initially - language switcher is currently visible
    // We expect localeLinks to be commented out or removed
    const hasActiveLocaleLinks = configContent.match(/localeLinks:\s*{/) && 
                                !configContent.match(/\/\/.*localeLinks:/);
    expect(hasActiveLocaleLinks).toBeFalsy();
  });
});

/**
 * Helper function to extract navigation section for a specific item
 */
function extractNavSection(configContent, sectionName) {
  const sectionStart = configContent.indexOf(`text: '${sectionName}'`) || 
                      configContent.indexOf(`text: "${sectionName}"`);
  if (sectionStart === -1) return '';
  
  // Find the items array for this section
  const itemsStart = configContent.indexOf('items:', sectionStart);
  if (itemsStart === -1) return '';
  
  // Extract until the closing bracket (simplified)
  const itemsEnd = configContent.indexOf(']', itemsStart);
  return configContent.substring(itemsStart, itemsEnd);
}
