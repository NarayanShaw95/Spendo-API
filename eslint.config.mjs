// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-plugin-prettier/recommended';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      'dist/',
      'node_modules',
      '*.config.ts',
      '*.config.js',
      '*.config.cjs',
      '*.config.mjs',
      'jest.config.js',
    ],
  },

  // Base JavaScript rules
  eslint.configs.recommended,

  // TypeScript rules with type-checking
  ...tseslint.configs.recommendedTypeChecked,

  // Prettier formatting
  prettierConfig,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // Code quality
      'no-console': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],

      // Type safety
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',

      // NestJS style helpers
      '@typescript-eslint/consistent-type-imports': 'error',

      // Formatting
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
);
