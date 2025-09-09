import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier'; // << Thêm vào
import importPlugin from 'eslint-plugin-import'; // << Đổi tên để rõ ràng hơn
import jsxA11y from 'eslint-plugin-jsx-a11y'; // << Thêm vào

export default tseslint.config(
  // Bỏ qua các file/thư mục trên toàn cục
  {
    ignores: ['dist', 'eslint.config.js'],
  },

  // Cấu hình chính cho các file TypeScript/React
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
      'jsx-a11y': jsxA11y,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      // Kế thừa các bộ quy tắc được khuyến nghị
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules, // << Thêm bộ quy tắc a11y
      ...prettierConfig.rules, // << QUAN TRỌNG: Tắt các quy tắc xung đột với Prettier

      // Các quy tắc tùy chỉnh
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // Quy tắc sắp xếp import
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
);
