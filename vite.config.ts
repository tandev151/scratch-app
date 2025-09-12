import { fileURLToPath, URL } from 'url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const commonConfig = {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        // Use import.meta.url in order to have exact and safe path
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    test: {
      globals: true, // Allow use describe, it, expect...without importing
      environment: 'jsdom', // emualate DOM for React
      setupFiles: './src/setupTests.ts', // file setup for RTL
      css: true, // allow import CSS in file
      coverage: {
        reporter: ['text', 'json', 'html'], // Configure report for coverage
        lines: 80,
        branches: 80,
        functions: 80,
        statements: 80,
      },
      include: ['src/__tests__/**/*.test.{ts,tsx}', 'src/**/*.test.{ts,tsx}'], // chỉ tìm test ở đây
      exclude: ['node_modules', 'dist'],
    },
  };

  // Specifically configure for Development
  if (command === 'serve' || mode === 'development') {
    return {
      ...commonConfig,
      server: {
        port: 3000,
        // proxy: {
        //   '/api': {
        //     target: 'http://localhost:8080',
        //     changeOrigin: true,
        //   },
        // },
      },
    };
  }

  // Specifically configure for Production
  if (command === 'build' || mode === 'production') {
    return {
      ...commonConfig,
      build: {
        rollupOptions: {
          // Thêm plugin phân tích bundle chỉ khi build
          output: {
            manualChunks(id) {
              // Group React and ReactDOM into a 'vendor-react' chunk
              // if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
              //   console.log({ vendor_React_id: id });
              //   return 'vendor-react';
              // }

              // All other node_modules go into a generic 'vendor' chunk
              if (id.includes('node_modules')) {
                return 'vendor';
              }
              // Let Rollup handle the rest (your application code)
              // Returning `undefined` or nothing allows Rollup to decide
            },
          },
        },
        chunkSizeWarningLimit: 1000,
      },
      // Có thể đặt base path cho production nếu bạn deploy vào một thư mục con
      // base: '/my-app/',
    };
  }

  return commonConfig;
});
