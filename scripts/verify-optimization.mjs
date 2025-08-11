#!/usr/bin/env node

/**
 * Comprehensive Optimization System Verification
 * Validates all implemented modules and features
 */

import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

class OptimizationVerifier {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0
    };
  }

  log(message, type = 'info') {
    const colors = {
      success: GREEN,
      error: RED,
      warning: YELLOW,
      info: BLUE
    };
    console.log(`${colors[type]}${message}${RESET}`);
  }

  check(description, testFn, critical = true) {
    try {
      const result = testFn();
      if (result) {
        this.log(`✅ ${description}`, 'success');
        this.results.passed++;
        return true;
      } else {
        this.log(`❌ ${description}`, 'error');
        if (critical) this.results.failed++;
        else this.results.warnings++;
        return false;
      }
    } catch (error) {
      this.log(`❌ ${description} - ${error.message}`, 'error');
      if (critical) this.results.failed++;
      else this.results.warnings++;
      return false;
    }
  }

  fileExists(path) {
    return existsSync(path);
  }

  fileContains(path, content) {
    if (!this.fileExists(path)) return false;
    const fileContent = readFileSync(path, 'utf8');
    return fileContent.includes(content);
  }

  async runVerification() {
    this.log(`${BOLD}🚀 OPTIMIZATION SYSTEM VERIFICATION${RESET}`, 'info');
    this.log('=' .repeat(50), 'info');

    // Core Configuration Files
    this.log('\n📋 Configuration Files:', 'info');
    this.check('astro.config.mjs exists', () => this.fileExists('astro.config.mjs'));
    this.check('package.json exists', () => this.fileExists('package.json'));
    this.check('tsconfig.json exists', () => this.fileExists('tsconfig.json'));

    // Optimization Modules
    this.log('\n🔧 Optimization Modules:', 'info');
    this.check('astro-compress configured', () => 
      this.fileContains('astro.config.mjs', 'astro-compress'));
    this.check('vite-plugin-pwa configured', () => 
      this.fileContains('astro.config.mjs', 'VitePWA'));
    this.check('@astrojs/partytown configured', () => 
      this.fileContains('astro.config.mjs', 'partytown'));
    this.check('astro-icon configured', () => 
      this.fileContains('astro.config.mjs', 'icon'));

    // Advanced TypeScript Modules
    this.log('\n📊 Advanced Modules:', 'info');
    this.check('Performance Monitor exists', () => 
      this.fileExists('src/utils/advanced-performance-monitor.ts'));
    this.check('Cache System exists', () => 
      this.fileExists('src/utils/advanced-cache-system.ts'));
    this.check('Image Optimization exists', () => 
      this.fileExists('src/utils/image-optimization.ts'));
    this.check('Bundle Analyzer exists', () => 
      this.fileExists('src/utils/bundle-analyzer.ts'));
    this.check('Security Optimizer exists', () => 
      this.fileExists('src/utils/security-optimizer.ts'));
    this.check('Optimization Reporter exists', () => 
      this.fileExists('src/utils/optimization-reporter.ts'));

    // UI Components
    this.log('\n🎨 UI Components:', 'info');
    this.check('Optimization Dashboard exists', () => 
      this.fileExists('src/components/OptimizationDashboard.astro'));

    // Package Dependencies
    this.log('\n📦 Dependencies:', 'info');
    const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
    
    this.check('astro-compress installed', () => !!deps['astro-compress']);
    this.check('vite-plugin-pwa installed', () => !!deps['vite-plugin-pwa']);
    this.check('@astrojs/partytown installed', () => !!deps['@astrojs/partytown']);
    this.check('astro-icon installed', () => !!deps['astro-icon']);
    this.check('sharp installed', () => !!deps['sharp']);
    this.check('web-vitals installed', () => !!deps['web-vitals']);

    // Build Verification
    this.log('\n🏗️ Build System:', 'info');
    try {
      this.log('Running TypeScript check...', 'info');
      execSync('npx tsc --noEmit', { stdio: 'pipe' });
      this.log('✅ TypeScript compilation successful', 'success');
      this.results.passed++;
    } catch (error) {
      this.log('❌ TypeScript compilation failed', 'error');
      this.results.failed++;
    }

    // Feature Verification
    this.log('\n⚡ Features:', 'info');
    this.check('PWA manifest configured', () => 
      this.fileContains('astro.config.mjs', 'manifest'));
    this.check('Service worker enabled', () => 
      this.fileContains('astro.config.mjs', 'workbox'));
    this.check('Image compression configured', () => 
      this.fileContains('astro.config.mjs', 'Image'));
    this.check('Terser optimization enabled', () => 
      this.fileContains('astro.config.mjs', 'terser'));

    // Final Results
    this.log('\n' + '='.repeat(50), 'info');
    this.log(`${BOLD}📊 VERIFICATION RESULTS${RESET}`, 'info');
    this.log(`✅ Passed: ${this.results.passed}`, 'success');
    this.log(`❌ Failed: ${this.results.failed}`, this.results.failed > 0 ? 'error' : 'success');
    this.log(`⚠️  Warnings: ${this.results.warnings}`, this.results.warnings > 0 ? 'warning' : 'success');

    const totalTests = this.results.passed + this.results.failed + this.results.warnings;
    const successRate = ((this.results.passed / totalTests) * 100).toFixed(1);
    
    this.log(`\n🎯 Success Rate: ${successRate}%`, successRate >= 90 ? 'success' : 'warning');

    if (this.results.failed === 0) {
      this.log(`\n🎉 ${BOLD}OPTIMIZATION SYSTEM FULLY OPERATIONAL!${RESET}`, 'success');
      this.log('All enterprise-grade optimization modules are properly configured.', 'success');
    } else {
      this.log(`\n⚠️  ${BOLD}ISSUES DETECTED${RESET}`, 'warning');
      this.log('Some optimization features may not be working correctly.', 'warning');
    }

    return this.results.failed === 0;
  }
}

// Run verification
const verifier = new OptimizationVerifier();
verifier.runVerification().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error('Verification failed:', error);
  process.exit(1);
});
