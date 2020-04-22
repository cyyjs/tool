<template>
  <div class="home drag">
    <SettingBtn class="setting"/>
    <router-link class="nodrag" :to="item.path" v-for="item in list" :key="item.name" :style="{backgroundImage: `url(${item.meta.img})`}">
      <span>{{item.meta.title}}</span>
    </router-link>
  </div>
</template>

<script>
import list from '@/router/list'
import SettingBtn from '@/components/settingBtn'
export default {
  name: 'home',
  components: { SettingBtn },
  data () {
    return {
      list
    }
  }
}
</script>
<style scoped lang="scss">
.setting {
  position: fixed;
  right: 10px;
  top: 10px;
}
.home {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  &>a{
    border-radius: 3px;
    width: 160px;
    height: 160px;
    display: block;
    margin: 10px;
    color: #fff;
    position: relative;
    overflow: hidden;
    font-size: 16px;
    background-size: cover;
  }
  span {
    background: rgba(0, 0, 0, 0.5);
    display: block;
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 5px 0;
  }
}
</style>
