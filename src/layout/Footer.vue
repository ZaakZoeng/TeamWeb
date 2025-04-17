<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useDark } from "@vueuse/core";
const isDark = ref(useDark());

const logo = ref<any>(null);
const logoLink = ref<any>(null);
const clustrmaps = ref<any>(null);
// 获取当前年份
const currentYear = ref(new Date().getFullYear()); // 获取当前年份
const startYear = 2023; // 设置起始年份
const poweredList = ref<any>(null);

onMounted(async () => {
  try {
    const response = await fetch('/jsons/00.basic.json');
    const data = await response.json();
    logo.value = data.footer.logo;
    logoLink.value = data.footer.logoLink;
    clustrmaps.value = data.footer.clustrmaps;
    poweredList.value = data.footer.poweredList;
  } catch (error) {
    console.error('Failed to fetch jsons/00.basic.json:', error);
  }
});
</script>

<template>
  <el-row :style="{ 'background-color': !isDark ? '#f8f4ed' : '#0f1423' }">
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <el-menu class="footer-wrap" mode="horizontal" :ellipsis="false"
        :background-color="!isDark ? '#f8f4ed' : '#0f1423'">
        <div>
          <a :href="logoLink" target="_blank">
            <el-image class="footer-wrap-logo" :src="logo">
              <div slot="placeholder">Loading<span class="dot">...</span></div>
            </el-image>
          </a>
        </div>
        <div class="footer-wrap-flex-grow"></div>
        <div>
          <a class="map-small" href="https://clustrmaps.com/site/1bve7" title="Visit tracker"><img
              :src="clustrmaps" /></a>
        </div>
        <div class="footer-wrap-flex-grow"></div>
        <div class="footer-wrap-text">
          <div>© {{ startYear }} - {{ currentYear }} <a v-for="(item, index) in poweredList" :key="index"
              :href="item.link" target="_blank" style="color: #409eff">{{ item.name }}. </a>
            <div>
              Powered by <a href="https://zz.biometa.top/TeamWeb/" target="_blank">TeamWeb</a></div>
          </div>
        </div>
      </el-menu>
      <div class="mobile-footer-wrap">
        <div>
          <a :href="logoLink" target="_blank">
            <el-image class="footer-wrap-logo" :src="logo">
              <div slot="placeholder">Loading<span class="dot">...</span></div>
            </el-image>
          </a>
        </div>
        <div class="footer-wrap-flex-grow"></div>
        <div>
          <a class="map-small" href="https://clustrmaps.com/site/1bve7" title="Visit tracker"><img
              :src="clustrmaps" /></a>
        </div>
        <div class="mobile-footer-wrap-text">
          <div>© {{ startYear }} - {{ currentYear }} <a v-for="(item, index) in poweredList" :key="index"
              :href="item.link" target="_blank" style="color: #409eff">{{ item.name }}. </a>
            <div>
              Powered by <a href="https://zz.biometa.top/TeamWeb/" target="_blank">TeamWeb</a></div>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
</template>

<style>
.footer-wrap {
  width: 100%;
  padding: 50px 0;
  border: none;
}

.footer-wrap-logo {
  height: 57px;
}

.footer-wrap-flex-grow {
  flex-grow: 1;
}

.footer-wrap-text {
  /* text-align: end; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.mobile-footer-wrap {
  padding: 50px 0;
  text-align: center;
}

.mobile-footer-wrap-text {
  margin: 25px 0 0 0;
}

/* 判断屏幕宽度小于680px后使用百分比 */
@media screen and (max-width: 680px) {
  .footer-wrap {
    display: none;
  }
}

@media screen and (min-width: 680px) {
  .mobile-footer-wrap {
    display: none;
  }
}
</style>
