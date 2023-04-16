module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true
  },
  parser: '@typescript-eslint/parser', // 添加解析器
  overrides: [ // 为特定的文件指示处理器
    {
      files: ['*.ts'], // 校验所有的ts文件
      extends: [ // 继承eslint规则
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking'
      ],
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2018,
        sourceType: 'module'
      }
    }
  ],
  plugins: ['@typescript-eslint', 'prettier']
}

