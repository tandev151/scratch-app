import { fileURLToPath, URL } from 'url';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  console.log({ mode });
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
  // if (command === 'build' || mode === 'production') {
  //   return {
  //     ...commonConfig,
  //     build: {
  //       sourcemap: 'hidden', // Tạo source map nhưng không link trong file bundle
  //       // rollupOptions: {
  //       //   // Thêm plugin phân tích bundle chỉ khi build
  //       //   plugins: [visualizer({ open: true })],
  //       // },
  //     },
  //     // Có thể đặt base path cho production nếu bạn deploy vào một thư mục con
  //     // base: '/my-app/',
  //   };
  // }

  return commonConfig;
});
