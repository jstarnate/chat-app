import merge from 'webpack-merge';
import config from './webpack.common.babel';

export default merge(config, {
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]((axios|react|prop-types|redux|socket.io-client).*)[\\/]/,
                    name: 'vendor',
                    chunks: 'all',
                },
            },
        },
    },
});
