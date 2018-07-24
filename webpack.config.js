const CopyWebpackPlugin = require("copy-webpack-plugin")
const configuration = {};

module.exports = {
    target: "electron",
    devtool: "source-map",
    node: {
        __dirname: false,
        __filename: false,
    },
    entry:
    {
        main: "./src/main.js",
        render: "./src/render/index.js"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.(eot|woff|woff2|svg|ttf|png)([\?]?.*)$/, loader: "file-loader" },
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([{
            from: "src/index.html",
            to: "index.html"
        }])
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    externals: {
        "ace": true
    }
};