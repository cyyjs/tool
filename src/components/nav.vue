<template>
  <div id="nav" class="drag">
    <span>{{$route.meta.title}}</span>
    <router-link to="/" class="nodrag home" title="返回" v-show="$route.meta.back">
      <svg t="1587446049815" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="24956" width="32" height="32"><path d="M512 512m0 512a512 512 0 1 0 0-1024 512 512 0 1 0 0 1024Z" fill="#47547E" p-id="24957"></path><path d="M668.373333 790.293333a48.746667 48.746667 0 0 1-68.906666 0l-243.84-243.84a48.746667 48.746667 0 1 1 68.906666-68.928l243.84 243.84a48.597333 48.597333 0 0 1 14.293334 34.453334c0 12.48-4.757333 24.96-14.293334 34.474666z" fill="#FFFFFF" p-id="24958"></path><path d="M668.373333 302.634667L424.533333 546.474667a48.746667 48.746667 0 0 1-68.906666-68.928l243.84-243.84a48.746667 48.746667 0 0 1 68.906666 68.928z" fill="#FFFFFF" p-id="24959"></path></svg>
    </router-link>
  </div>
</template>
<style lang="scss" scoped>
#nav {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  box-shadow: 0px 1px 2px #ddd;
  margin-bottom: 10px;
  text-align: center;
  .home {
    float: right;
    cursor: pointer;
  }
  span{
    display: inline-block;
    margin-top: 4px;
  }
}
.icon {
  width: 16px;
  height: 25px;
  margin-right: 10px;
  display: block;
  cursor: pointer;
}
</style>
