<template>
  <div id="app">
    <MNav v-show="$route.name !== 'home'"></MNav>
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
