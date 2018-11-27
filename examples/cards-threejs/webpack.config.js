const path = require('path')
const TSLintPlugin = require('tslint-webpack-plugin')
const DotEnvPlugin = require('dotenv-webpack')

module.exports = {
  entry: path.join(__dirname, '/src/index.ts'),
  output: {
    filename: 'cards.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  plugins: [
    new TSLintPlugin({
      files: ['./src/**/*.ts']
    }),
    new DotEnvPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 8000
  }
}
