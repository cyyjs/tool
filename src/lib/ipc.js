const { ipcRenderer } = require('electron')

export const emitIpcAsync = async (name, option) => {
  ipcRenderer.send('async', {
    type: name,
    data: option
  })
  return new Promise((resolve) => {
    ipcRenderer.once(`async:${name}`, (event, result) => {
      if (result.err) {
        new Notification("提示", {
          body: result.err
        })
        resolve(result)
      } else {
        resolve(result)
      }
    })
  })
}

export const emitIpcSync = (name, option) => {
  return ipcRenderer.sendSync('sync', {
    type: name,
    data: option
  })
}
