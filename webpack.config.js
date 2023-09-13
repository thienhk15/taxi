const webpack = require('webpack');

module.exports = {
  // ...
  plugins: [
    new webpack.DefinePlugin({
      'process.env.AUTH_API': JSON.stringify(process.env.AUTH_API),
      'process.env.ADMIN_API': JSON.stringify(process.env.ADMIN_API),
    }),
  ],
  // ...
};






