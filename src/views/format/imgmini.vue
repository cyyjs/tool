<template>
  <div class="content">
    <Loading v-show="disabled"></Loading>
    <div class="count">
      <span>本月剩余压缩次数：{{lave}}</span>
    </div>
    <div class="drag-box" v-show="!code">
      <div>
          <i class="fa fa-upload"></i>
          <span>拖放图片文件到此，或点击上传</span>
          <input @change="change" type="file" accept="image/*">
      </div>
    </div>
    <div class="box">
      <div class="img">
        <input @change="change" type="file" accept="image/*" />
        <img :src="code" alt />
      </div>
      <div class="code-box" v-show="!!code">
        <div><label>压缩前：</label>{{before}}</div>
        <div><label>压缩后：</label>{{after}}</div>
        <div><label>压缩比：</label>{{ratio}} %</div>
        <div>
          <button :disabled="disabled" class="primary btn" @click="save">压缩并保存</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from '@/components/loading'
import { emitIpcAsync } from '../../lib/ipc'
const sum = 500

export default {
  components: { Loading },
  data() {
    return {
      count: '-',
      disabled: false,
      code: "",
      minied: false,
      file: {},
      miniFile: {
        size: 0
      }
    };
  },
  computed: {
    lave () {
      return sum - (+this.count || 0)
    },
    before () {
      return this.formatSize(this.file.size || 0)
    },
    after () {
      if (!this.minied) {
        return '-'
      }
      return this.formatSize(this.miniFile.size || 0)
    },
    ratio () {
      if (!this.minied) {
        return '0.00'
      }
      let b = this.file.size || 0
      let a = this.miniFile.size || 0

      return ((b - a) / b * 100).toFixed(2)
    }
  },
  async mounted () {
    let { data } = await emitIpcAsync('miniImg:count')
    this.count = +data
  },
  methods: {
    formatSize (size) {
      let unit = 'B'
      let r = 0
      if (size > 1024) {
        r = size / 1024
        unit = 'KB'
      }
      if (r > 1024) {
        r = r / 1024
        unit = 'MB'
      }
      if (r > 1024) {
        r = r / 1024
        unit = 'TB'
      }
      return r.toFixed(2) + unit
    },
    change(e) {
      this.miniFile.size = 0
      this.minied = false
      this.path = "";
      let file = e.target.files[0];
      if (!file) {
        return
      }
      if (!file.type.startsWith("image/")) {
        new Notification("提示", {
          body: "请选择图片类型文件"
        });
        return;
      }
      this.file = file;
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        this.code = reader.result;
      });
      reader.readAsDataURL(file);
    },
    async save () {
      let fileName = this.file.name
      let fileNames = fileName.split('.')
      if (fileNames.length > 1) {
        fileName = fileNames.slice(0, -1).join('.') + '-mini.' + fileNames[fileNames.length - 1]
      } else {
        fileName += '-mini'
      }
      
      let newPath = this.file.path.split('/').slice(0, -1).join('/') + '/' + fileName
      let pathResult = await emitIpcAsync('file:path', {
        defaultPath: newPath
      })
      let path = pathResult.data
      if (!path) {
        return
      }
      this.disabled = true
      let { msg, size, count } = await emitIpcAsync('miniImg:minify', {
        path: this.file.path,
        savePath: path
      })
      if (msg) {
        new Notification("提示", {
          body: msg
        });
        this.disabled = false
        return;
      }
      this.count = count
      this.miniFile.size = size
      new Notification("提示", {
        body: "压缩后图片已保存"
      })
      this.minied = true
      this.disabled = false
    }
  }
};
</script>
<style scoped lang="scss">
.count {
  position: absolute;
  right: 20px;
  top:0px;
}
.drag-box {
  position: relative;
  text-align: center;
  border: 2px dashed #ccc;
  border-radius: 15px;
  height: 100%;
  font-size: 16px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  & > div {
    color: #ccc;
    margin: auto;
    i {
      font-size: 50px;
    }
    & > span {
      margin-top: 10px;
      display: block;
    }
  }
}
.btn {
  width: 100px;
  margin-top: 10px;
  line-height: 0;
}
.img {
  position: relative;
  input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
}
.box {
  display: flex;
  justify-content: space-between;
  height: 100%;
}
.box > div {
  width: 50%;
}
img {
  width: 90%;
}
</style>


