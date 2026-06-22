// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    // 1. Look for test files ONLY inside the tests folder
    include: ['tests/**/*.test.{ts,tsx}'],
    // 2. Explicitly ignore Playwright specs so Vitest doesn't run them
    exclude: ['tests/**/*.spec.ts', 'node_modules', 'dist', '.next'],
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'), // Adjusts alias mapping to your root structure
    },
  },
});