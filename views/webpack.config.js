const path = require('path');
const htmlWebpack = require('html-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts.js'
  },
  module: {
    rules: [
      { 
        test: /\.(js)$/, 
        use: 'babel-loader' 
      },
      { 
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'] 
      }
    ]
  },
  mode: 'production',
  plugins: [
    new htmlWebpack({
        template: 'src/index.html'
    })
  ]
};
