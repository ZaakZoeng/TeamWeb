<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDark } from "@vueuse/core"; // 引入暗黑模式

const isDark = ref(useDark());
const screenWidth = ref();
screenWidth.value = document.body.clientWidth;
window.onresize = () => {
  screenWidth.value = document.body.clientWidth;
};


const researchBasic = ref<any>(null);
const researches = ref<any>(null);

onMounted(async () => {
  try {
    const response = await fetch('/jsons/02.research.json');
    const data = await response.json();
    researchBasic.value = data.basic;
    researches.value = data.researches;
  } catch (error) {
    console.error('Failed to fetch jsons/02.research.json:', error);
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
          <el-col class="wrapper-sketch-text" :span="screenWidth > 1200 ? 14 : 24" v-if="researchBasic">
            <div class="wrapper-sketch-text-title">Research</div>
            <div class="wrapper-sketch-text-subtitle">{{ researchBasic.subtitle }}</div>
            <h1 class="wrapper-sketch-text-content">{{ researchBasic.slogan }}</h1>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
  <!-- 介绍 -->
  <el-row class="research-intro" :style="{ 'background-color': !isDark ? '#e2e1e4' : '#22202e' }">
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <el-row v-if="researchBasic">
        <!-- 左侧文本 -->
        <el-col :span="screenWidth > 1200 ? 10 : 24">
          <p class="web-text">{{ researchBasic.researchIntroduction }}</p>
        </el-col>
        <!-- 右侧图片 -->
        <el-col class="research-intro-image" :span="screenWidth > 1200 ? 12 : 24" :offset="screenWidth > 1200 ? 2 : 0">
          <el-image :src="researchBasic.researchImage"></el-image>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
  <!-- 内容 -->
  <div v-for="(research, index) in researches" :key="index">
    <div v-if="research.isShow">
      <!-- Part -->
      <el-row class="research-part" :style="{ 'background-color': !isDark ? '#cdd1d3' : '#131124' }">
        <el-col :span="2"></el-col>
        <el-col :span="20">
          <h1>{{ research.title }}</h1>
          <el-row>
            <el-col :span="screenWidth > 1200 ? 10 : 24">
              <el-image style="width: 100%" fit="fill" :src="research.image" :zoom-rate="1.2"
                :preview-src-list="[research.image]" :initial-index="4" hide-on-click-modal="true"></el-image>
            </el-col>
            <el-col :span="screenWidth > 1200 ? 10 : 24" :offset="screenWidth > 1200 ? 4 : 0"
              class="research-part-text">
              <h2>{{ research.subtitle }}</h2>
              <span class="web-text">{{ research.content }}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="2"></el-col>
      </el-row>
    </div>
  </div>
</template>

<style scoped>
.research-intro {
  padding: 100px 0;
  /* border: 1px solid red; */
}

.research-intro-image {
  display: flex;
  justify-content: right;
  align-items: center;
  /* border: 1px solid green; */
}

.research-part {
  padding: 50px 0 70px 0;
  /* border: 1px solid blue; */
}

/* .research-part-text {
  text-align: justify;
} */

.research-paper {
  /* text-align: justify; */
  padding: 40px 0 80px 0;
}

.research-paper ol {
  /* margin: 0; */
  padding: 0 0 0 20px;
}

/* 判断屏幕宽度小于540px后使用百分比 */
@media screen and (max-width: 1200px) {
  .research-intro-image {
    margin: 30px 0 0 0;
    display: flex;
    justify-content: left;
    align-items: center;
    /* border: 1px solid green; */
  }
}
</style>
