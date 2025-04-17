<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useDark } from "@vueuse/core"; // 引入暗黑模式


const isDark = ref(useDark());
const screenWidth = ref();
screenWidth.value = document.body.clientWidth;
window.onresize = () => {
  screenWidth.value = document.body.clientWidth;
};

const fill = ref(true);

const teamBasic = ref<any>(null);
const teamPersons = ref<any>(null);
const teamSupports = ref<any>(null);

onMounted(async () => {
  try {
    const response = await fetch('./jsons/03.team.json');
    const data = await response.json();
    teamBasic.value = data.basic;
    teamPersons.value = data.persons;
    teamSupports.value = data.supports;
  } catch (error) {
    console.error('Failed to fetch jsons/03.team.json:', error);
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
          <el-col class="wrapper-sketch-text" :span="screenWidth > 1200 ? 14 : 24" v-if="teamBasic">
            <div class="wrapper-sketch-text-title">Team</div>
            <div class="wrapper-sketch-text-subtitle">{{ teamBasic.subtitle }}</div>
            <h1 class="wrapper-sketch-text-content">{{ teamBasic.slogan }}</h1>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
  <!-- 统计 -->
  <el-row class="team-statistic" :style="{ 'background-color': !isDark ? '#e2e1e4' : '#22202e' }">
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <el-row>
        <!-- 左侧文本 -->
        <el-col :span="screenWidth > 1200 ? 8 : 24">
          <span v-if="teamBasic" class="web-text">{{ teamBasic.teamIntroduction }}</span>
        </el-col>
        <!-- 右侧图片 -->
        <el-col class="team-statistic-image" :span="screenWidth > 1200 ? 14 : 24" :offset="screenWidth > 1200 ? 2 : 24"
          v-if="teamBasic">
          <el-image style="width: 100%" fit="fill" :src="teamBasic.teamImage" :zoom-rate="1.2"
            :preview-src-list="[teamBasic.teamImage]" :initial-index="4" hide-on-click-modal="true"></el-image>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
  <!-- 人像 -->
  <el-row class="team-people" :style="{ 'background-color': !isDark ? '#cdd1d3' : '#131124' }">
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <h1 v-if="teamPersons">Team members</h1>
      <el-row :gutter="70">
        <el-col class="team-people-person" :span="screenWidth > 1600 ? 8 : screenWidth > 1080 ? 12 : 24"
          v-for="(person, index) in teamPersons" :key="index" v-show="person.isShow">
          <!-- Image + Info -->
          <div class="team-people-person-box">
            <el-image class="team-people-person-box-image" style="width: 100%" :src="person.avatar"
              :fit="fill"></el-image>
            <!-- Info -->
            <div class="team-people-person-box-info" :style="{
              background: !isDark
                ? 'rgba(255, 255, 255, 0.6)'
                : 'rgba(0, 0, 0, 0.6)',
            }">
              <!-- Biography -->
              <p>{{ person.biography }}</p>
              <!-- Hometown -->
              <p v-if="person.hometown">Hometown: {{ person.hometown }}</p>
              <!-- Fun Fact -->
              <p v-if="person.fact">Fun Fact: {{ person.fact }}</p>
            </div>
          </div>
          <div class="team-people-person-card">
            <!-- Name + Position -->
            <div class="team-people-person-card-basic">
              <!-- Name -->
              <el-link class="team-people-person-card-basic-name" :underline="false" target="_blank"
                :href="person.website">
                {{ person.name }}
              </el-link>
              <!-- Position -->
              <el-tag class="team-people-person-card-basic-position" size="large" effect="plain">{{ person.position
                }}</el-tag>
            </div>
            <!-- Timeline -->
            <div v-if="person.timeline" class="team-people-person-card-timeline">
              <span>{{ person.timeline }}</span>
            </div>
            <!-- Interests -->
            <div class="team-people-person-card-interests-wrapper">
              <el-tag class="team-people-person-card-interests" v-for="(interest, index) in person.interests"
                :key="index"><font-awesome-icon :icon="['fas', 'tag']" />
                {{ interest }}</el-tag>
            </div>
            <!-- Commerce -->
            <div>
              <span v-for="(sns, index) in person.commerce" :key="index" v-show="sns.account">
                <el-link class="team-people-person-card-commerce" :underline="false" target="_blank" type="primary"
                  :href="sns.link">
                  <el-tooltip :content="sns.account">
                    <font-awesome-icon :icon="sns.icon" />
                  </el-tooltip>
                </el-link>
              </span>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
  <!-- 合作 -->
  <el-row class="team-support" :style="{ 'background-color': !isDark ? '#f1f0ed' : '#131824' }">
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <h1>CURRENT AND PREVIOUS SUPPORT</h1>
      <el-row class="team-support-wrap">
        <el-col :span="screenWidth > 1200 ? 12 : 24">
          <el-carousel :interval="1000" type="card" height="150px" indicator-position="outside">
            <el-carousel-item class="team-support-wrap-card" v-for="(support, index) in teamSupports" :key="index">
              <el-link :underline="false" :href="support.link" target="_blank">
                <el-image :src="support.logo" />
              </el-link>
            </el-carousel-item>
          </el-carousel>
        </el-col>
        <el-col :span="screenWidth > 1200 ? 8 : 24" :offset="screenWidth > 1200 ? 4 : 0">
          <span class="web-text">Here are some friendly links and cooperation units, thank you for
            cooperation and support.
          </span>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
</template>

<style>
.team-statistic {
  padding: 100px 0;
  /* border: 1px solid red; */
}

.team-statistic-card {
  margin: 0 0 15px 0;
  /* border: 1px solid green; */
}

.team-statistic-image {
  display: flex;
  justify-content: right;
  align-items: center;
}

.team-people {
  padding: 15px 0 0 0;
  /* border: 1px solid green; */
}

.team-people h1 {
  font-size: 60px;
  font-family: ABC Maxi;
  font-weight: 400 !important;
}

.team-people-person {
  margin-bottom: 30px;
  /* border: 1px solid red; */
}

.team-people-person-box {
  position: relative;
}

.team-people-person-box-info {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 40px;
  font-size: large;
  /* text-align: justify; */
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  /* background: rgba(0, 0, 0, 0.6); */
  opacity: 0;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
}

.team-people-person-box:hover .team-people-person-box-info {
  opacity: 1;
}

.team-people-person-card {
  padding: 12px 0 60px 0;
}

.team-people-person-card-basic {
  display: flex;
  justify-content: left;
  align-items: center;
}

.team-people-person-card-basic-name {
  font-size: 32px;
  margin-right: 10px;
}

.team-people-person-card-basic-position {
  font-size: 14px;
  font-weight: bold;
  font-style: italic;
}

.team-people-person-card-interests-wrapper {
  margin: 12px 0 0 0;
}

.team-people-person-card-interests {
  margin: 0 16px 12px 0;
}

.team-people-person-card-commerce {
  /* border: 1px solid green; */
  font-size: 18px;
  margin: 0 12px 0 0;
}

.team-people-person-card-timeline {
  font-style: italic;
  font-size: 18px;
  margin: 12px 0 0 0;
}

.team-support {
  padding: 30px 0 100px 0;
}

.team-support-wrap {
  padding: 30px 0;
  display: flex;
  justify-content: left;
  align-items: center;
  /* border: 1px solid green; */
}

.team-support-wrap-card {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/* 判断屏幕宽度小于1200px后使用百分比 */
@media screen and (max-width: 1200px) {
  .team-statistic-image {
    margin: 30px 0 0 0;
    display: flex;
    justify-content: left;
    align-items: center;
    /* border: 1px solid green; */
  }
}

/* 判断屏幕宽度小于640px后使用百分比 */
@media screen and (max-width: 640px) {
  .team-people-person-card-basic-name {
    font-size: 24px;
  }

  .team-people-person-box-info {
    font-size: small;
  }
}
</style>
