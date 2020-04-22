const fs = require('fs');
const tinify = require("tinify");
const store = require('./store')

class MiniImg {
  constructor () {
    tinify.key = store.get('tinifyKey')
  }

  validate () {
    return new Promise((resolve, reject) => {
      tinify.validate(function(err) {
        if (err) {
          return resolve({
            err: 'tinifyKey验证失败'
          })
        }
        resolve({})
      })
    })
  }

  async setKey (key) {
    tinify.key = key
    store.set('tinifyKey', key)
    return await this.validate()
  }

  getCountThisMonth () {
    let compressionsThisMonth = tinify.compressionCount;
    return {
      data: compressionsThisMonth || 0
    }
  }

  async minify({path, savePath}) {
    return new Promise((resolve, reject) => {
      tinify.fromFile(path).toFile(savePath, async(err) =>{
        if (err instanceof tinify.AccountError) {
          resolve({
            err: '检测key是否正确，或是否超出每月压缩数量限制'
          })
        } else if (err instanceof tinify.ClientError) {
          resolve({
            err: '图片或请求错误'
          })
        } else if (err instanceof tinify.ServerError) {
          resolve({
            err: 'Tinify API 接口错误'
          })
        } else if (err instanceof tinify.ConnectionError) {
          resolve({
            err: '网络连接错误'
          })
        } else if(err) {
          resolve({
            err: err
          })
        }
        let file = fs.readFileSync(savePath)
        let count = this.getCountThisMonth().data
        return resolve({
          count,
          size: file.length
        })
      })
    })
  }
}
module.exports = new MiniImg()