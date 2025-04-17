<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDark } from "@vueuse/core"; // 引入暗黑模式

const isDark = ref(useDark());
const screenWidth = ref();
screenWidth.value = document.body.clientWidth;
window.onresize = () => {
  screenWidth.value = document.body.clientWidth;
};


const momentsBasic = ref<any>(null);
const moments = ref<any>(null);

onMounted(async () => {
  try {
    const response = await fetch('/jsons/06.moments.json');
    const data = await response.json();
    momentsBasic.value = data.basic;
    moments.value = data.moments;
  } catch (error) {
    console.error('Failed to fetch jsons/06.moments.json:', error);
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
          <el-col class="wrapper-sketch-text" :span="screenWidth > 1200 ? 14 : 24" v-if="momentsBasic">
            <div class="wrapper-sketch-text-title">Research</div>
            <div class="wrapper-sketch-text-subtitle">{{ momentsBasic.subtitle }}</div>
            <h1 class="wrapper-sketch-text-content">{{ momentsBasic.slogan }}</h1>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
  <!-- 时间轴 -->
  <el-row :style="{ 'background-color': !isDark ? '#cdd1d3' : '#131124' }">
    <el-col :span="2"></el-col>
    <el-col class="timeline" :span="20">
      <el-timeline class="moments-timeline">
        <el-timeline-item v-for="(moment, index) in moments" :key="index"
          :class="index % 2 === 0 ? 'timeline-left' : 'timeline-right'" :timestamp="moment.date" placement="top"
          type="success" size="large" hollow="true" v-show="moment.isShow">
          <el-card>
            <span class="web-text">{{ moment.title }}
              <el-link target="_blank" type="primary" :href="moment.link" style="font-size: 16px; font-weight: bold"
                v-show="moment.link">
                <font-awesome-icon :icon="['fas', 'link']" /> Link
              </el-link>
            </span>
            <p>
              <el-image style="width: 100%" :src="moment.image" :zoom-rate="1.2" :preview-src-list="[moment.image]"
                :initial-index="4" hide-on-click-modal="true"></el-image>
            </p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
    <!-- Mobile Timeline -->
    <el-col class="mobile-timeline" :span="screenWidth > 700 ? 15 : 20">
      <el-timeline class="moments-timeline">
        <el-timeline-item v-for="(moment, index) in moments" :key="index" :timestamp="moment.date" placement="top"
          type="success" size="large" hollow="true" v-show="moment.isShow">
          <el-card>
            <span class="web-text">{{ moment.title }}
              <el-link target="_blank" type="primary" :href="moment.link" style="font-size: 16px; font-weight: bold"
                v-show="moment.link">
                <font-awesome-icon :icon="['fas', 'link']" /> Link
              </el-link>
            </span>
            <p>
              <el-image style="width: 100%" :src="moment.image" :zoom-rate="1.2" :preview-src-list="[moment.image]"
                :initial-index="4" hide-on-click-modal="true"></el-image>
            </p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
</template>

<style scoped>
.moments-timeline {
  padding: 50px 0 100px 0;
}

.moments-timeline :deep(.el-timeline-item__timestamp) {
  margin: 0 0 20px 0;
  font-size: x-large;
  font-weight: bold;
}

.timeline-right {
  left: 50%;
  width: 50%;
  /* right: 0; */
  /* border: 1px solid blue; */
}

.timeline-left {
  left: 50%;
  width: 50%;
  /* border: 1px solid green; */
}

.timeline-left :deep(.el-timeline-item__wrapper) {
  right: 100%;
  padding: 0 19px 0 0;
  text-align: right;
}

/* 判断屏幕宽度小于1080px后使用百分比 */
@media screen and (max-width: 1200px) {
  .timeline {
    display: none;
  }
}

@media screen and (min-width: 1200px) {
  .mobile-timeline {
    display: none;
  }
}
</style>
