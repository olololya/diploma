'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const path = require('path');

module.exports = {
    context: path.resolve(__dirname, 'src'),

    entry: {
        index: [
            'react-hot-loader/patch',
            "webpack-dev-server/client?http://localhost:8080",
            "webpack/hot/dev-server",
            './index'
        ]
    },

    output: {
        path: path.resolve(__dirname, 'public'),
        publicPath: '/',
        filename: '[name].js',
        library: '[name]'
    },

    devtool: NODE_ENV == 'development' ? 'source-map' : null,


    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify('development')
        }),
       // new webpack.HotModuleReplacementPlugin()
    ],

    resolveLoaders: {
        modulesDirectories: ['node_modules'],
        moduleTemplates: ['*-loader', '*'],
        extensions: ['', '.js']
    },

    resolve: {
        extensions: ['', '.js', '.jsx', '.json']
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel'
        }, {
            test: /\.(js$|jsx?$)/,
            exclude: /node_modules/,
            loaders: ['babel']
        }, {
            test: /\.scss$/,
            loader: 'style!css?sourceMap!resolve-url!sass?sourceMap'
        }, {
            test: /\.png$/,
            loader: "url-loader?limit=100000"
        }, {
            test: /\.jpg$/,
            loader: "file-loader"
        }, {
            test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=application/octet-stream'
        }, {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file'
        }, {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'url?limit=10000&mimetype=image/svg+xml'
        }]
    },

    devServer: {
        host: 'localhost',
        port: 8080,
        contentBase: path.resolve(__dirname, 'public'),
        hot: true,
        historyApiFallback: true
    }
};
