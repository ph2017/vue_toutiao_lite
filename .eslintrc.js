// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    //不检查末尾的;
    'semi': 0,

    //不检查函数名后大括号({})之间的空格
    'space-before-blocks': 0,

    'indent': 0,

    //函数名与后面括号之间的空格
    'space-before-function-paren': 0,

    //函数体后的换行符
    'eol-last': 0,

    //函数体内的换行
    'padded-blocks': 0
  }
}
