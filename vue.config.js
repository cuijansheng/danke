const CompressionPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',  //生产环境路径配置
  css: {
    sourceMap: true, // 开启 CSS source maps
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
  },
  chainWebpack: config => {

  },
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'https://xiaolaba.pplu.vip/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': 'app'
        }
      }
    }
  },
};
