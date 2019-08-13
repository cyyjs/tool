<template>
  <div id="app">
    <MNav></MNav>
    <div class="main">
        <router-view/>
    </div>
  </div>
</template>
<script>
import MNav from '@/components/nav.vue'
export default {
  components: { MNav }
}
</script>
<style lang="scss" scoped>
.main {
    position: absolute;
    overflow: hidden;
    top: 55px;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
