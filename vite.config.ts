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
        // Sử dụng import.meta.url để có đường dẫn an toàn và chính xác
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  };

  // Cấu hình cho môi trường Development
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

  // Cấu hình cho môi trường Production
  if (command === 'build' || mode === 'production') {
    return {
      ...commonConfig,
      build: {
        sourcemap: 'hidden', // Tạo source map nhưng không link trong file bundle
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
                console.log({ vendor_id: id });
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
