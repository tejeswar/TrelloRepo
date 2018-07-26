const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
module.exports = {
    entry : "./src/js/index.js",
    watch: true,
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename:"bundle.js"
    },
    module:{
        rules:[
               {
                   test:  /\.js$/ ,
                   exclude: /node_modules/ ,
                   use:"babel-loader"
                },
                {
                    test:/\.css$/,
                    exclude: /node_modules/ ,
                    use:[
                        { loader:"style-loader"},
                        {loader:"css-loader"}
                       ]


                }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './index.html'
        })
      ],
      mode: 'development'
}