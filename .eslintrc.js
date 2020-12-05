module.exports = {
  extends: 'erb/typescript',
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'no-shadow': 'off',
    'react/jsx-one-expression-per-line': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-void': 'off',
    'react/require-default-props': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'react/display-name': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    'no-case-declarations': 'warn',
    'no-nested-ternary': 'off',
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    createDefaultProgram: true,
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./configs/webpack.config.eslint.js'),
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
}
