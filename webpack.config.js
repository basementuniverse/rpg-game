const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
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
  },
  output: {
    filename: 'game.js',
    path: path.resolve(__dirname, 'build'),
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
  externals: [
    {
      "hammerjs": "Hammer"
    },
  ],
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'node_modules/hammerjs/hammer.min.js',
          to: 'lib',
        },
      ],
      options: {
        concurrency: 100,
      },
    }),
  ],
};
