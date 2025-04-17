<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useDark } from "@vueuse/core"; // 引入暗黑模式

const isDark = ref(useDark());
const screenWidth = ref();
screenWidth.value = document.body.clientWidth;
window.onresize = () => {
  screenWidth.value = document.body.clientWidth;
};


const resourcesBasic = ref<any>(null);
const resources = ref<any>(null);

onMounted(async () => {
  try {
    const response = await fetch('./jsons/05.resources.json');
    const data = await response.json();
    resourcesBasic.value = data.basic;
    resources.value = data.resources;
  } catch (error) {
    console.error('Failed to fetch jsons/05.resources.json:', error);
  }
});
</script>

<template>
  <!-- 背景 -->
  <div class="wrapper-background"></div>
  <!-- 简述 -->
  <div class="wrapper-sketch">
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="20">
        <el-row>
          <el-col class="wrapper-sketch-text" :span="screenWidth > 1200 ? 14 : 24" v-if="resourcesBasic">
            <div class="wrapper-sketch-text-title">Resources</div>
            <div class="wrapper-sketch-text-subtitle">{{ resourcesBasic.subtitle }}</div>
            <h1 class="wrapper-sketch-text-content">{{ resourcesBasic.slogan }}</h1>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
  <!-- 内容 -->
  <div>
    <el-row class="resources-wrap" :style="{ 'background-color': !isDark ? '#cdd1d3' : '#131124' }">
      <el-col :span="2"></el-col>
      <el-col :span="20" v-if="resources">
        <!-- 核心内容 -->
        <el-row v-for="(resource, index) in resources" :key="index" v-show="resource.isShow">
          <!-- 8→24 -->
          <el-col :span="screenWidth > 1200 ? 8 : 24">
            <h1>{{ resource.title }}</h1>
          </el-col>
          <!-- 14→24，2→0 -->
          <el-col :span="screenWidth > 1200 ? 14 : 24" :offset="screenWidth > 1200 ? 2 : 0">
            <h2>{{ resource.subtitle }}</h2>
            <ul>
              <li class="web-text" v-for="(tool, index) in resource.tools" :key="index" v-show="tool.isShow">
                <span>{{ tool.name }}: {{ tool.desc }}</span>
                <el-link style="font-size: large" :underline="false" target="_blank" type="primary" :href="tool.link">
                  <font-awesome-icon icon="arrow-up-right-from-square" />
                </el-link>
              </li>
            </ul>
          </el-col>
          <el-divider border-style="dashed" class="resources-wrap-divider" />
        </el-row>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
</template>

<style scoped>
.resources-wrap {
  padding: 50px 0;
}

.resources-wrap-divider {
  margin: 50px 0;
}
</style>
