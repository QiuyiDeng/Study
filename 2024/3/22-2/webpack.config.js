const path = require('path')
const HWP = require('html-webpack-plugin')
module.exports={
  mode:'development',
  entry:'./src/index.js',
  output:{
    path:path.resolve(__dirname,'dist'),
    filename:'[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader','css-loader']
      },
    ],
  },
  plugins:[
    new HWP({
      template:'./index.html',
      filename: 'index.html'
    })
  ]
}