<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router"; // 引入路由
import { useDark } from "@vueuse/core"; // 引入暗黑模式
import { Sunny, Moon } from "@element-plus/icons-vue";

const route = useRoute();
const isDark = ref(useDark());

const logo = ref<any>(null);

onMounted(async () => {
  try {
    const response = await fetch('/jsons/00.basic.json');
    const data = await response.json();
    logo.value = data.header.logo;
  } catch (error) {
    console.error('Failed to fetch jsons/00.basic.json:', error);
  }
});
</script>

<template>
  <!-- <el-row :style="{ 'background-color': (!isDark ? 'white' : 'black') }"> -->
  <el-row :class="!isDark ? 'header-wrap-light' : 'header-wrap-dark'">
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <el-menu :default-active="route.path" router class="header-menu" mode="horizontal" :ellipsis="false"
        :background-color="!isDark ? '#fffef8' : '#0f1423'">
        <!-- <div class="header-menu-logo header-menu-item-flex"><a href="/">Computational Bioinformatics Group</a></div> -->
        <div class="header-menu-logo-warp header-menu-item-flex">
          <a href="/">
            <el-image class="header-menu-logo-wrap-image" :src="logo">
              <div slot="placeholder">Loading<span class="dot">...</span></div>
            </el-image>
          </a>
        </div>
        <div class="header-menu-flex-grow"></div>
        <el-menu-item index="/">Home</el-menu-item>
        <el-menu-item index="/research">Research</el-menu-item>
        <el-menu-item index="/team">Team</el-menu-item>
        <el-menu-item index="/publications">Publications</el-menu-item>
        <el-menu-item index="/resources">Resources</el-menu-item>
        <el-menu-item index="/moments">Moments</el-menu-item>
        <el-menu-item index="/contact">Contact</el-menu-item>
        <div class="header-menu-item-flex">
          <el-switch v-model="isDark" inline-prompt :active-icon="Moon" :inactive-icon="Sunny" active-color="#303030"
            inactive-color="#909399" border-color="#D4D7DE" />
        </div>
      </el-menu>
      <el-menu :default-active="route.path" router class="mobile-header-menu" mode="horizontal" :ellipsis="false"
        :background-color="!isDark ? '#fffef8' : '#0f1423'">
        <div class="header-menu-logo-warp header-menu-item-flex">
          <a href="/">
            <el-image class="header-menu-logo-wrap-image" :src="logo">
              <div slot="placeholder">Loading<span class="dot">...</span></div>
            </el-image>
          </a>
        </div>
        <div class="header-menu-flex-grow"></div>
        <el-sub-menu>
          <template #title><font-awesome-icon :icon="['fas', 'bars']" /></template>
          <el-menu-item index="/">Home</el-menu-item>
          <el-menu-item index="/research">Research</el-menu-item>
          <el-menu-item index="/team">Team</el-menu-item>
          <el-menu-item index="/publications">Publications</el-menu-item>
          <el-menu-item index="/resources">Resources</el-menu-item>
          <el-menu-item index="/moments">Moments</el-menu-item>
          <el-menu-item index="/contact">Contact</el-menu-item>
        </el-sub-menu>
        <div class="header-menu-item-flex">
          <el-switch v-model="isDark" inline-prompt :active-icon="Moon" :inactive-icon="Sunny" active-color="#303030"
            inactive-color="#909399" border-color="#D4D7DE" />
        </div>
      </el-menu>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
</template>

<style>
.header-wrap-light {
  background-color: #fffef8;
  box-shadow: 0 0 10px 10px #fffef8;
}

.header-wrap-dark {
  background-color: #0f1423;
  box-shadow: 0 0 10px 10px #0f1423;
}

.header-menu {
  border: none;
  padding: 40px 0px;
}

.header-menu-logo-warp {
  font-size: large;
  font-style: italic;
  font-weight: bolder;
}

.header-menu-item-flex {
  /* border: 1px solid green; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.header-menu-logo-wrap-image {
  height: 40px;
}

.header-menu-flex-grow {
  flex-grow: 1;
}

/* 导航栏每个item的样式 */
.el-menu--horizontal>.el-menu-item {
  font-size: 17px;
  /* font-family: neue-haas-grotesk-display, Arial, Helvetica, sans-serif; */
  background-color: transparent !important;
  border: none;
}

/* 选中导航item后的样式 */
.el-menu--horizontal>.el-menu-item.is-active {
  border: none;
  /* 设置背景颜色 */
  background-color: transparent !important;
}

/*********************** mobile ********************************* */
.mobile-header-menu {
  border: none;
  padding: 40px 0px;
}

/* 去除 submenu 小箭头 */
.mobile-header-menu .el-sub-menu>.el-sub-menu__title .el-sub-menu__icon-arrow {
  display: none;
}

/* 去除 submenu 底线边框 */
.el-menu--horizontal>.el-sub-menu.is-active .el-sub-menu__title {
  border: none;
  background-color: transparent !important;
}

/* 判断屏幕宽度小于1080px后使用百分比 */
@media screen and (max-width: 1200px) {
  .header-menu {
    display: none;
  }
}

@media screen and (min-width: 1200px) {
  .mobile-header-menu {
    display: none;
  }
}
</style>
