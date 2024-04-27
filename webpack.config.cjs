const path = require('path');

module.exports = {
  entry: './src/frontend/ts/Entry.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    aliasFields: ['caseSensitive'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public', 'js'),
  },
  mode: 'development',
};