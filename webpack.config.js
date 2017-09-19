"use strict";

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const isProd = (process.env.NODE_ENV === 'production');

console.log(process.env.NODE_ENV);

const CSSloaders = [
    {
        loader: 'css-loader',
    },
    {
        loader: 'postcss-loader',
        options: {
            plugins: function () {
                return [
                    require('autoprefixer')
                ];
            }
        }
    },
    {
        loader: 'sass-loader?outputStyle=expanded' +
        'includePaths[]=' +
        (encodeURIComponent(path.resolve('./node_modules')))
    },
];

const srcFolder = path.resolve(__dirname, 'src'),
    distFolder = path.resolve(__dirname, 'dist');

// Webpack Clean Options
// the path(s) that should be cleaned
const cleanOptions = {
    root:     __dirname,
    verbose:  true,
    dry:      false
};

const plugins = [
    new CleanWebpackPlugin('dist', cleanOptions),
    new ExtractTextPlugin({ filename: '../css/[name].bundle.css' }),
    new CopyWebpackPlugin([
        { from: srcFolder + '/img', to: distFolder + '/img' },
        { from: srcFolder + '/fonts', to: distFolder + '/fonts' },
        { from: srcFolder + '/*.html', to: distFolder }
    ]),

];

if (isProd) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        fromString: true,
        output: {
            "ascii_only": true
        }
    }));
}


module.exports = {
    devServer: {
        port: 8080,
        contentBase: distFolder,
        outputPath: distFolder,
        publicPath: distFolder
    },
    context: srcFolder,

    resolve: {
        alias: {
            react: path.resolve('./node_modules/react'),
        },
    },

    entry: {
        app: './js/index.js',
    },

    output: {
        path: distFolder + '/js',
        filename: '[name].bundle.js',
        publicPath: distFolder
    },

    // Webpack plugins
    plugins: plugins,

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-0'],
                },
                exclude: /node_modules/,
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['react', 'es2015', 'stage-0']
                },
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: CSSloaders,
                }),

            }
        ]
    },

    watch: !isProd,
    devtool: 'source-map',


};
