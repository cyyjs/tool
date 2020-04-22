const { ipcMain } = require('electron')
const miniImg = require('./miniimage')
const file = require('./file')
const setting = require('./setting')
const store = require('./store')

const getResult = async(type, data) => {
  let result = ''
  switch (type) {
    case 'miniImg:minify':
      result = await miniImg.minify(data)
      break;
    case 'miniImg:setKey':
      result = await miniImg.setKey(data)
      break;
    case 'miniImg:count':
      result = await miniImg.getCountThisMonth()
      break;
    case 'miniImg:validate':
      result = await miniImg.validate()
      break;
    case 'file:path':
      result = file.getPath(data)
      break;
    case 'file:save':
      result = file.save(data)
      break;
    case 'setting:open':
      result = setting.open()
      break;
    case 'setting:close':
      result = setting.close()
      break;
    case 'store:get':
      result = store.get(data)
      break;
    case 'store:set':
      result = store.set(data.key, data.value)
      break;
  }
  return result
}

ipcMain.on('async', async (event, {type, data}) => {
  let result = await getResult(type, data)
  event.reply(`async:${type}`, result)
})

ipcMain.on('sync', async (event, {type, data}) => {
  let result = await getResult(type, data)
  event.returnValue = result
})
