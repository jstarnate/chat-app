import { EnvironmentPlugin } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import Dotenv from 'dotenv-webpack';
import path from 'path';

const serverPort = process.env.SERVER_PORT || 8000;
const devMode = process.env.NODE_ENV === 'development';

const config = {
    mode: process.env.NODE_ENV,
    devtool: 'eval-source-map',
    entry: {
        index: ['./client/js/index.js', './client/sass/index.scss'],
        register: ['./client/js/register.js', './client/sass/register.scss'],
        app: ['./client/js/app.js', './client/sass/app.scss'],
    },
    output: {
        filename: '[name].[chunkhash].js',
        publicPath: '/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', { targets: { esmodules: true } }],
                        '@babel/preset-react',
                    ],
                    plugins: ['@babel/plugin-syntax-dynamic-import'],
                },
            },
            {
                test: /\.s(a|c)ss$/,
                exclude: path.resolve(__dirname, 'node_modules'),
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { hmr: devMode },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
        ],
    },
    resolve: {
        alias: {
            Components: path.join(__dirname, 'client/js/components'),
            Utilities: path.join(__dirname, 'client/js/components/utilities'),
            Views: path.join(__dirname, 'client/js/views'),
            Hooks: path.join(__dirname, 'client/js/hooks'),
            Actions: path.join(__dirname, 'client/js/store/actions'),
        },
    },
    plugins: [
        new EnvironmentPlugin({ SERVER_PORT: serverPort }),
        new Dotenv(),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html',
            chunks: ['index'],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/register.html'),
            filename: 'register.html',
            chunks: ['register'],
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/app.html'),
            filename: 'app.html',
            chunks: ['app'],
        }),
    ],
};

if (devMode) {
    config.devServer = {
        hot: true,
        port: process.env.CLIENT_PORT || 3000,
        historyApiFallback: false,
        contentBase: path.resolve(__dirname, 'dist'),
        writeToDisk: true,
        proxy: {
            '/': { target: `http://localhost:${serverPort}` },
            '/api': { target: `http://localhost:${serverPort}/api` },
            '/contacts': {
                target: `http://localhost:${serverPort}/contacts`,
                ws: true,
            },
            '/messages': {
                target: `http://localhost:${serverPort}/messages`,
                ws: true,
            },
        },
    };
}

if (!devMode) {
    config.optimization = {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]((axios|react|prop-types|redux|socket.io-client).*)[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    };
}

export default config;
