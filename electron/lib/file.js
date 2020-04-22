const { dialog, ipcMain } = require('electron')
const fs = require('fs')


class File {
  getPath (data) {
    let path = dialog.showSaveDialogSync({
      title: '选择要保存的位置',
      defaultPath: data.defaultPath,
      properties: ['createDirectory']
    })
    return {
      data: path
    }
  }
  save ({path, data}) {
    fs.writeFileSync(path, data)
    return {}
  }
}

module.exports = new File()