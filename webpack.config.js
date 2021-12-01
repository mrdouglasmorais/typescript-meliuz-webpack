const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production'

module.exports = {
  mode: isDevelopment ? 'development' : 'production',
  devtool: isDevelopment ? 'eval-source-map' : 'source-map',
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions:  ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      "@": path.join(__dirname, 'src')
    }
  },
  devServer: {
    static: path.resolve(__dirname, 'public'),
    historyApiFallback: true,
    hot: true,
    port: 3001,
  },
  plugins: [
    isDevelopment && new ReactRefreshPlugin({
      overlay: false
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public', 'index.html')
    })
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.(t|j)s(|x)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              isDevelopment && require.resolve('react-refresh/babel')
            ].filter(Boolean)
          },
        }
      },
      {
        test: /\.s?(c|a)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'] 
      },
      {
        test: /\.(jpg|gif|jpeg|png|bmp)$/,
        exclude: /node_modules/,
        loader: 'file-loader'
      }
    ]
  }
}