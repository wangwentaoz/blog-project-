<template>
  <div class="container">
    <common-header></common-header>
    <router-view></router-view>
    <common-footer></common-footer>
  </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue';
import CommonFooter from '@/components/CommonFooter.vue';
export default {
  components: {
    CommonHeader,
    CommonFooter,
  },
};
</script>

<style scoped lang="scss">
footer {
  margin-top: 80px;
  padding: 15px 0;
  background: #2d2d2d;
  color: #bbb;
  box-shadow: 0 -2px 4px 1px rgba(0, 0, 0, 0.5);
}
</style>
