var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var NpmInstallPlugin = require('npm-install-webpack-plugin');

var config = {
    entry: {
        app: [
            './app/index'
        ],
      //  vendor: 'vendor'
        vendor: [
          'lodash',
          'react',
          'react-dom',
          'react-redux',
          'redux',
          'react-router-dom',
          'axios',
          'react-bootstrap'
        ]
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].[hash].js',
        publicPath: '/',
        pathinfo: true
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new ExtractTextPlugin("styles.css"),
        new webpack.DefinePlugin({
          'process.env': {
          'NODE_ENV': JSON.stringify('production')
          }
        }),
        new webpack.ProvidePlugin({ $: 'jquery', jQuery: 'jquery' }),
          
        new webpack.HashedModuleIdsPlugin(),        
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
        new webpack.DefinePlugin({
            "require.specified": "require.resolve",
            'SERVICE_URL': '"http://186.33.216.232/catastro-service/v1/"'
        }),
        new HtmlWebpackPlugin({
         title: 'CatastroWeb',
         template: 'public/index.ejs'
        }),

/*
      No descomentar hasta qu no esten bien separadas las devDependencies
        new NpmInstallPlugin({
            save: true
        }),
*/        new webpack.optimize.CommonsChunkPlugin({
         name: 'runtime'
        }),
new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html|css)$/,
            threshold: 10240,
            minRatio: 0.8
        }),
	new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
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
          node_modules: path.resolve('node_modules')
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
                    test: /\.(eot|com|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
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
                  },

          ]
    }
};


module.exports = config;
