const path = require('path');

module.exports = {
  mode:'development',
  entry: './src/babel.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module:{
    rules:[
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader'
      }
    ]
  }
};