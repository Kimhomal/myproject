const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development', // 배포 모드 ('production', 'development')
  // 진입점 설정. 번들 파일을 만들기 위한 첫 파일 경로
  entry: {
    // key값으로 파일이 만들어짐(ex app.bundle.js). 기본은 'main'
    app: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', // hot module 사용을 위한 구문. 파일 업데이트 감지 및 재빌드
      './public/javascripts/index.js'
    ]
  },
  devtool: 'inline-source-map', // 오류 발생 소스 파일 추적 기능
  // 플러그인 설정 부분
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 코드 변화 감지 및 재빌드
    new CleanWebpackPlugin(), // bundle file 자동 삭제
    // 번들을 제공 할 HTML 파일을 생성하는 설정
    new HtmlWebpackPlugin({
      title: 'My Project',
      filename: 'index.pug'
    }),
    // Pug 사용을 위한 설정
    new HtmlWebpackPugPlugin({
      adjustIndent: true
    })
  ],
  // bundle file 옵션 설정
  output: {
    filename: '[name].bundle.js', // 번들 결과 파일명 지정
    chunkFilename: '[name].bundle.js', // 청크 파일명 지정
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    hotUpdateChunkFilename: '.hot/[id].[hash].hot-update.js',
    hotUpdateMainFilename: '.hot/[hash].hot-update.json'
  },
  module: {
    rules: [
      {
        // css 파일 번들러
        // css 파일들을 번들링하여 html 상단에 자동으로 로드해주는 설정
        test: /\.css$/, // 번들링할 css 파일 설정(정규표현식)
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  }
};