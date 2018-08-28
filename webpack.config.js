var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');
var NpmInstallPlugin = require('npm-install-webpack-plugin');

var config = {
    entry: [
            'webpack-dev-server/client?http://' + require("ip").address() + ':9000/',
            'webpack/hot/only-dev-server',
            'react-hot-loader/patch',
            './app/index.js'
    ],
    devtool: '#source-map',
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].[hash].js',
        publicPath: '/',
        pathinfo: true
    },
    plugins: [
        //new BundleAnalyzerPlugin(),
        new ExtractTextPlugin("styles.css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HashedModuleIdsPlugin(),
  new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'}),
        new webpack.DefinePlugin({
            'require.specified' : "require.resolve",
            'ENVIRONMENT': JSON.stringify(process.env.NODE_ENV || 'development'),
            'SERVICE_URL': '"http://186.33.216.232/catastro-service/v1/"',
            'VERSION': JSON.stringify(require('./package.json').version)
        }),
        new HtmlWebpackPlugin({
         title: 'Inmoflow',
         template: 'public/index.ejs'
        })
    ],
    resolve: {
        alias: {
          jquery: "jquery/src/jquery",
          actions: path.resolve('app/actions'),
          components: path.resolve('app/components'),
          reducers: path.resolve('app/reducers'),
          views: path.resolve('app/views'),
          config: path.resolve('app/config'),
          node_modules: path.resolve('node_modules'),
          public: path.resolve('public')
        }
    },
    module: {
        rules: [
                  {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                      'babel-loader',
                    ],

                  },
                  {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                      fallback: "style-loader",
                      use: "css-loader"
                    })
                  },
                  {
                    test: /\.(png|jpg|gif)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader',
                    options:{
                      limit:'100000',
                      name: '[path][name].[ext]'
                    }
                  },
                  {
                    test: /\.(eot|com|json|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader',
                    options:{
                      limit:'10000',
                      mimetype:'application/octet-stream'
                    }
                  },
                  {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader',
                    options:{
                      limit:'10000',
                      mimetype:'image/svg+xml',
                      name: '[path][name].[ext]'
                    }
                  }

          ]
    }
};


module.exports = config;