var webpack = require('webpack');
var config = require('./webpack.config.js');

config.devtool = 'eval';

config.entry.app.unshift(
    'webpack-dev-server/client?http://localhost:8080'
);

config.plugins.push(new webpack.NoErrorsPlugin());

module.exports = config;
