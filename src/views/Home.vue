<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDark } from "@vueuse/core"; // 引入暗黑模式

const isDark = ref(useDark());
const screenWidth = ref();
screenWidth.value = document.body.clientWidth;
window.onresize = () => {
  screenWidth.value = document.body.clientWidth;
};

// 创建响应式数据
const homeBasic = ref<any>(null);
const homeNews = ref<any>(null);

// 使用 onMounted 生命周期钩子来加载数据
onMounted(async () => {
  try {
    // 使用 fetch 或 Axios 来请求数据
    const response = await fetch('./jsons/01.home.json'); // 获取 public 目录中的 json 文件
    const data = await response.json();
    homeBasic.value = data.basic; // 将数据赋值给响应式变量
    homeNews.value = data.news; // 将数据赋值给响应式变量
  } catch (error) {
    console.error('Failed to fetch jsons/01.home.json:', error);
  }
});
</script>

<template>
  <!-- 首页背景图 -->
  <div class="home-background"></div>
  <!-- 首页导语 -->
  <el-row class="home-intro">
    <el-col :span="2"></el-col>
    <el-col :span="20" v-if="homeBasic">
      <h1>{{ homeBasic.title }}</h1>
      <h2>{{ homeBasic.subtitle }}</h2>
      <span>{{ homeBasic.introduction }}</span>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
  <!-- 首页内容 -->
  <div>
    <el-row :style="{ 'background-color': !isDark ? '#cdd1d3' : '#131124' }">
      <el-col :span="2"></el-col>
      <el-col :span="20">
        <!-- 招兵买马 -->
        <div class="home-recruiting">
          <el-row>
            <el-col :span="screenWidth > 1200 ? 8 : 24">
              <h1>Hot News</h1>
            </el-col>
            <el-col :span="screenWidth > 1200 ? 14 : 24" :offset="screenWidth > 1200 ? 2 : 0">
              <div v-for="(n, index) in homeNews" :key="index">
                <div v-if="n.isShow">
                  <h2>
                    {{ n.title }}
                    <el-link target="_blank" type="primary" :href="n.link" style="font-size: 16px; font-weight: bold">
                      Link
                    </el-link>
                  </h2>
                  <h4>{{ n.datetime }}</h4>
                  <h4>{{ n.address }}</h4>
                  <p class="web-text">{{ n.introduction }}</p>
                  <!-- 分割线 -->
                  <el-divider style="margin-top: 100px"></el-divider>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
</template>

<style scoped>
.home-background {
  width: 100%;
  min-height: 100%;
  /* background: url("/../assets/home-test.png") center center no-repeat; */
  background: url("/assets/00.basic/background.png") center center no-repeat;
  background-size: 100% 100%;
  position: fixed;
  z-index: -1;
  overflow: auto;
}

.home-intro {
  padding: 100px 0 220px 0;
  color: white;
  /* border: 1px solid green; */
}

.home-intro h1 {
  font-size: 80px;
}

.home-intro h2 {
  font-size: 60px;
}

.home-intro span {
  font-size: 48px;
  line-height: 1.2;
}

.home-recruiting {
  padding: 50px 0 80px 0;
}

/* 判断屏幕宽度小于1080px后使用百分比 */
@media screen and (max-width: 1200px) {
  .home-intro {
    padding: 100px 0 200px 0;
  }

  .home-intro h1 {
    font-size: 64px;
  }

  .home-intro h2 {
    font-size: 46px;
  }

  .home-intro span {
    font-size: 32px;
  }
}

/* 判断屏幕宽度小于640px后使用百分比 */
@media screen and (max-width: 640px) {
  .home-intro {
    padding: 100px 0 180px 0;
  }

  .home-intro h1 {
    font-size: 52px;
  }

  .home-intro h2 {
    font-size: 36px;
  }

  .home-intro span {
    font-size: 28px;
  }
}
</style>
