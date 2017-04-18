var path = require('path');

module.exports=[{
  entry:{
    'app':'./public/app.js'
  },
  output:{
      filename : 'bundle.js',
      path: path.resolve(__dirname,'public/build'),
      publicPath: '/public/build/'
  },
  module:{
    loaders:[
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader'
      },
      {
         test: /\.css$/,
         loader: "style-loader!css-loader"
      },
      {
         test: /\.scss$/,
         loaders: [ 'style-loader', 'css-loader', 'sass-loader']
      },
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  devServer:{
    inline: true,
    port: 8080,
    historyApiFallback: true
  }
},{
  entry:{
    'style':'./public/css/style.js'
  },
  output:{
      filename : 'style.js',
      path: path.resolve(__dirname,'public/build'),
      publicPath: '/public/build/'
  },
  module:{
    loaders:[
      {
         test: /\.css$/,
         loader: "style-loader!css-loader"
      },
      {
         test: /\.scss$/,
         loaders: [ 'style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader'
      }
    ]
  }
}];
