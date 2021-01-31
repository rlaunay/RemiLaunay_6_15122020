const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
                test: /\.(png|jpg|gif|mp4)$/,
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
        })
    ],
}

module.exports = (env, argv) => {

    if (argv.mode === "development") {
        config.devtool = "eval-cheap-module-source-map"
    }

    if (argv.mode === "production") {
        config.watch = false
    }

    return config;
};