<!--
 * @Author: your name
 * @Date: 2019-11-29 09:11:56
 * @LastEditTime : 2019-12-23 17:06:33
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mini-admin\src\components\Breadcrumb\index.vue
 -->
<template>
  <div class="v-breadcrumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>{{title}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{title2}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: ''
    },
    title2: {
      default: ''
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.el-breadcrumb {
  font-size: 13px;
}
</style>