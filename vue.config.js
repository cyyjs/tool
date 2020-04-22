module.exports = {
  publicPath: '',
  devServer: {
    port: 8088, // 端口
  },
  configureWebpack: config => {
    config.target = 'electron-renderer'
  }
}