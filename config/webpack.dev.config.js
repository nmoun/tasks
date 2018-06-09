const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
            "/test": "http://localhost:3000"
        },
        overlay: true
    }
};
