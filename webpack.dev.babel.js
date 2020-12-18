import merge from 'webpack-merge';
import path from 'path';
import config from './webpack.common.babel';

const domain = 'http://localhost:8000';

export default merge(config, {
    devServer: {
        hot: true,
        port: process.env.CLIENT_PORT || 3000,
        historyApiFallback: false,
        contentBase: path.resolve(__dirname, 'dist'),
        writeToDisk: true,
        proxy: {
            '/': { target: domain },
            '/api': { target: `${domain}/api` },
            '/contacts': {
                target: `${domain}/contacts`,
                ws: true,
            },
            '/messages': {
                target: `${domain}/messages`,
                ws: true,
            },
        },
    },
});
