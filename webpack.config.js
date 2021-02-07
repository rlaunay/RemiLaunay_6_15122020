const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    watch: true,
    entry: './src/app.js',
    output: {
        path: path.resolve("./dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|mp4|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[hash:7].[ext]',
                    },
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
        new HtmlWebpackPlugin({
            favicon: "public/camera-solid.ico",
            template: 'public/index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            favicon: "public/camera-solid.ico",
            template: 'public/photographers/index.html',
            filename: 'photographers/index.html'
        })
    ],
}

module.exports = (env, argv) => {

    if (argv.mode === "development") {
        config.devtool = "eval-cheap-module-source-map"
        config.devServer = {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 9000
        }
    }

    if (argv.mode === "production") {
        config.watch = false
    }

    return config;
};