<template>
  <div class="box">
    <i class="fa fa-spin fa-spinner"></i>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.box {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
  display: flex;
}
.fa {
  font-size: 40px;
  width: 40px;
  height: 40px;
  color: #429AF4;
  margin: auto;
}
</style>