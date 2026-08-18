import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';

import sonarjs from 'eslint-plugin-sonarjs';
import security from 'eslint-plugin-security';
import promise from 'eslint-plugin-promise';
import vitest from 'eslint-plugin-vitest';

import query from '@tanstack/eslint-plugin-query';

import prettier from 'eslint-config-prettier';

export default tseslint.config(
  {
    ignores: ['dist', 'coverage', 'node_modules', '*.config.js', '*.config.ts', 'vite.config.ts'],
  },

  js.configs.recommended,

  ...tseslint.configs.recommendedTypeChecked,

  {
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },

      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    plugins: {
      import: importPlugin,
      sonarjs,
      security,
      promise,
      vitest,
      query,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
    },

    rules: {
      ...reactHooks.configs.recommended.rules,

      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],

          'newlines-between': 'always',

          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],

      'import/no-cycle': 'error',

      'import/no-default-export': 'error',

      'unused-imports/no-unused-imports': 'error',

      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/consistent-type-imports': 'error',

      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],

      '@typescript-eslint/no-floating-promises': 'error',

      '@typescript-eslint/no-misused-promises': 'error',

      '@typescript-eslint/no-unnecessary-condition': 'error',

      '@typescript-eslint/switch-exhaustiveness-check': 'error',

      '@typescript-eslint/no-explicit-any': 'warn',

      'promise/catch-or-return': 'error',

      'promise/no-return-wrap': 'error',

      'sonarjs/cognitive-complexity': ['error', 15],

      'sonarjs/no-duplicate-string': 'warn',

      'security/detect-object-injection': 'off',

      'no-console': [
        'warn',
        {
          allow: ['warn', 'error'],
        },
      ],
    },
  },

  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],

    plugins: {
      vitest,
    },

    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
  },

  prettier,
);
