const path = require('path');

module.exports = {
  entry: './src/router.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: 'http://0.0.0.0:8080/'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel', query: { presets: ['es2015', 'react'] } },
      { test: /\.s?css$/, loaders: ['style', 'css', 'sass'] },
      { test: /\.png$|\.jpe?g$/, loader: 'file' }
    ]
  },
  resolve: {
    modulesDirectories: ['src', 'node_modules'],
    extensions: ['', '.json', '.js', '.jsx']
  },
  stats: { colors: true },
  watch: true,
  progress: true,
  devServer: {
    contentBase: './build',
    inline: true,
    historyApiFallback: true
  }
}
