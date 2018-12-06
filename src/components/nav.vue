<template>
    <div id="nav" class="drag">
        <!-- <router-link to="/">HOME</router-link> -->
        <router-link to="/fm/json">JSON格式化</router-link>
    </div>
</template>
<style lang="scss" scoped>
#nav {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    right: 0;
    background: #eee;
    box-shadow: 0px 2px 5px #ccc;
    margin-bottom: 10px;
    text-align: right;
    a {
        font-weight: bold;
        color: #2c3e50;
        margin-right: 20px;
        line-height: 50px;
        display: inline-block;
        &.router-link-exact-active {
            color: #42b983;
            border-bottom: 3px solid #42b983;
            line-height: 47px;
        }
    }
}
</style>

