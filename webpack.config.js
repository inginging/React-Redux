"use strict";

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //TODO

const isProd = (process.env.NODE_ENV === 'production');

console.log(process.env.NODE_ENV);

const srcFolder = path.resolve(__dirname, 'src'),
    publicFolder = path.resolve(__dirname, 'public');

// Webpack Clean Options
// the path(s) that should be cleaned
const cleanOptions = {
    root:     publicFolder,
    verbose:  true,
    dry:      false
};

const plugins = [
    new CleanWebpackPlugin(['fonts','img'], cleanOptions),
    new ExtractTextPlugin({ filename: '../css/[name].bundle.css' }),
    new CopyWebpackPlugin([
        { from: srcFolder + '/img', to: publicFolder + '/img' },
        { from: srcFolder + '/fonts', to: publicFolder + '/fonts' },
        { from: srcFolder + '/*.html', to: publicFolder }
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
        contentBase: publicFolder,
        outputPath: publicFolder + '/',
        publicPath: '/',
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
        path: publicFolder,
        filename: 'js/[name].bundle.js',
        publicPath: '/public/'
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
                    use:
                    [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: isProd
                            }
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
                    ],
                }),

            }
        ]
    },

    watch: !isProd,
    devtool: 'source-map',

};
