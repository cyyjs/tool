<template>
  <div class="setting">
    <Loading v-show="loading"/>
    <div class="item">
      <div class="title">图片压缩</div>
      <div class="form-item">
        <label>tinifyKey</label>
        <input type="text" ref="tinifyKey" v-model="tinifyKey" placeholder="请输入tinify key">
      </div>
      <div class="tips">没有tinify Key？<a target="_blank" href="https://tinypng.com/developers">点此申请</a></div>
    </div>
    <div class="footer">
      <button class="" @click="close" style="margin-right:10px">关闭</button>
      <button class="primary" @click="save">保存</button>
    </div>
  </div>
</template>

<script>
import { emitIpcSync, emitIpcAsync } from '@/lib/ipc';
import Loading from '@/components/loading'
export default {
  components: { Loading },
  data () {
    return {
      loading: false,
      tinifyKey: ''
    }
  },
  created () {
    this.tinifyKey = emitIpcSync('store:get', 'tinifyKey')
  },
  methods: {
    close () {
      emitIpcSync('setting:close')
    },
    async save () {
      this.loading = true
      let { err } = await emitIpcAsync('miniImg:setKey', this.tinifyKey)
      this.loading = false
      if (err) {
        this.$refs.tinifyKey.focus()
      } else {
        emitIpcSync('setting:close')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.setting {
  padding: 10px 20px;
}
.title {
  font-weight: bold;
  border-bottom: 1px solid #eee;
  padding: 5px;
  margin-bottom: 10px;
}
.footer {
  text-align: center;
  &>button {
    width: 100px;
  }
}
</style>