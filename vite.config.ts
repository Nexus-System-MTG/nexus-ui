/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { playwright } from '@vitest/browser-playwright';
import dts from 'vite-plugin-dts';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react(),
    dts({ 
       include: ['src/components/', 'src/index.ts', 'src/lib/'],
       insertTypesEntry: true,
    })
  ],
  build: {
    lib: {
      entry: path.resolve(dirname, 'src/index.ts'),
      name: 'NexusUI',
      formats: ['es', 'umd'],
      fileName: (format) => `nexus-ui.${format}.js`
    },
    rollupOptions: {
      // Make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'react', 
        'react-dom', 
        'react/jsx-runtime',
        // Externalize all dependencies to reduce bundle size
        'recharts',
        'framer-motion',
        'date-fns',
        'lucide-react',
        'clsx',
        'tailwind-merge',
        'class-variance-authority',
        '@tanstack/react-table',
        'react-day-picker',
        'react-imask',
        // Regex to catch all radix-ui components
        /^@radix-ui\/.*/,
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          recharts: 'Recharts',
          'framer-motion': 'FramerMotion'
        }
      }
    }
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // Storybook test plugin removed
      ],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        },
        setupFiles: ['.storybook/vitest.setup.ts']
      }
    },
    {
      test: {
        name: 'unit',
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/setupTests.ts'],
        include: ['src/**/*.test.{ts,tsx}'],
      }
    }]
  }
});