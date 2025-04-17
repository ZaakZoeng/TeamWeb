<template>
  <div class="demo-progress">
    <el-progress type="circle" :percentage="25" :width="40" :stroke-width="2"
      >up</el-progress
    >
  </div>
</template>
<style scoped>
.demo-progress .el-progress--line {
  margin-bottom: 15px;
  width: 350px;
}

.demo-progress .el-progress--circle {
  margin-right: 15px;
}
</style>

<script lang="ts" setup></script>
