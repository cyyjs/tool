<template>
  <i class="fa fa-cog" @click="openSetting"></i>
</template>

<script>
import { emitIpcSync } from '@/lib/ipc';
export default {
  methods: {
    openSetting () {
      emitIpcSync('setting:open')
    }
  }
}
</script>

<style scoped>
.fa {
  font-size: 20px;
  cursor: pointer;
}
</style>