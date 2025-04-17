<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { useDark } from "@vueuse/core"; // 引入暗黑模式

const isDark = ref(useDark());
const screenWidth = ref();
screenWidth.value = document.body.clientWidth;
window.onresize = () => {
  screenWidth.value = document.body.clientWidth;
};


const contactBasic = ref<any>(null);
const contactContent = ref<any>(null);
const contactMap = ref<any>(null);

onMounted(async () => {
  try {
    const response = await fetch('./jsons/07.contact.json');
    const data = await response.json();
    contactBasic.value = data.basic;
    contactContent.value = data.content;
    contactMap.value = data.map;
  } catch (error) {
    console.error('Failed to fetch jsons/07.contact.json:', error);
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
          <el-col class="wrapper-sketch-text" :span="screenWidth > 1200 ? 14 : 24" v-if="contactBasic">
            <div class="wrapper-sketch-text-title">Research</div>
            <div class="wrapper-sketch-text-subtitle">{{ contactBasic.subtitle }}</div>
            <h1 class="wrapper-sketch-text-content">{{ contactBasic.slogan }}</h1>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
  <!-- 内容 -->
  <el-row :style="{ 'background-color': !isDark ? '#cdd1d3' : '#131124' }">
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <div class="contact-recruiting">
        <el-row>
          <!-- 8→24 -->
          <el-col :span="screenWidth > 1200 ? 8 : 24" v-if="contactContent">
            <h1>Contact us</h1>
            <p class="web-text">{{ contactContent.name }}</p>
            <p class="web-text">{{ contactContent.institution }}</p>
            <p class="web-text">{{ contactContent.address }}</p>
            <p class="web-text">{{ contactContent.phone }}</p>
            <p class="web-text">{{ contactContent.email }}</p>
          </el-col>
          <!-- 14→24，2→0 -->
          <el-col :span="screenWidth > 1200 ? 14 : 24" :offset="screenWidth > 1200 ? 2 : 0" v-if="contactMap">
            <iframe :style="screenWidth > 1200
              ? 'width: 100%; height: 100%;'
              : 'width: 100%; height: 400px; margin-top: 30px;'
              " :src="contactMap" frameborder="0"></iframe>
          </el-col>
        </el-row>
      </div>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
</template>
<style scoped>
.contact-recruiting {
  padding: 50px 0 180px 0;
}
</style>
