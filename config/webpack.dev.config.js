const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    devtool: 'source-map',
    resolve:{
        modules: ['node_modules', 'src']
    },
    module: {
        rules: [
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                      options: {
                        eslintPath: require.resolve('eslint'),
                        ignore: false
                      },
                      loader: require.resolve('eslint-loader'),
                    },
                  ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './template/index.html',
            file: './index.html'
        })
    ],
    devServer: {
        proxy: {            
            "/api": "http://localhost:3000"
        },
        overlay: true
    }
};
