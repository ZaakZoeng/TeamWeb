<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDark } from "@vueuse/core"; // 引入暗黑模式
import { parseBibFile } from "bibtex";  // 导入 bibtex 库中的 parseBibFile 函数

const isDark = ref(useDark());
const screenWidth = ref();
screenWidth.value = document.body.clientWidth;
window.onresize = () => {
  screenWidth.value = document.body.clientWidth;
};

// 点击按钮平滑过渡到对应的ID元素位置
function scrollToView(value: string): void {
  // console.log(value);
  const targetElement: HTMLElement | null = document.getElementById(value);
  // console.log(targetElement);
  if (targetElement) {
    targetElement.scrollIntoView({
      block: "start", // 上边框与视窗顶部平齐
      behavior: "smooth", // 平滑过渡
    });
  }
}

const publicationsBasic = ref<any>(null);
const papers = ref<any[]>([]);
const publications = ref<any[]>([]);

// 用于按年份聚合数据的函数
function transformPapersToPublications(papers: any[]): any[] {
  const publicationsMap: { [key: number]: any } = {};

  papers.forEach((paper) => {
    // console.log(paper.isShow);
    // 只有当 paper.isShow 为 true 时，才会将该论文插入
    if (paper.isShow !== 'true') {
      return;  // 如果 isShow 为 false 或不存在，跳过该论文
    }

    const year = new Date(paper.date).getFullYear();  // 提取年份

    // 如果年份对应的出版物不存在，则创建一个新的对象
    if (!publicationsMap[year]) {
      publicationsMap[year] = {
        _id: year,
        papers: [],
        count: 0,
        year: year,
      };
    }

    // 按照时间倒序插入文章（这里直接用 unshift 保证按时间倒叙）
    publicationsMap[year].papers.push(paper); // 使用 push 确保按时间倒序
    publicationsMap[year].count += 1;  // 增加该年份的文章计数

    // 排序 papers 数组，确保每个年份内的文章按日期倒序排列
    publicationsMap[year].papers.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  // 将 publicationsMap 转换为数组，并按年份倒叙排序
  const sortedPublications = Object.values(publicationsMap).sort((a, b) => b.year - a.year);
  return sortedPublications;
}

onMounted(async () => {
  try {
    const response = await fetch('./jsons/04.publications.json');
    const data = await response.json();
    publicationsBasic.value = data.basic;

    // 获取 BibTeX 文件内容
    const responsePapers = await fetch('./assets/04.publications/papers.bib');  // 假设这里是 BibTeX 文件的路径
    const bibtexData = await responsePapers.text(); // 获取文件内容并转换为字符串
    // console.log(bibtexData);

    // 使用 bibtex 库解析 BibTeX 数据
    const bibFile = parseBibFile(bibtexData);
    // console.log(bibFile)
    // console.log(bibFile.entries$["10.3389/fmicb.2025.1557285"].getField('doi'))
    // console.log(bibFile.entries$["10.3389/fmicb.2025.1557285"].getField('doi').data.join(''))

    // 将 BibTeX 数据转换为目标 JSON 格式
    papers.value = Object.values(bibFile.entries$).map((entry: any) => {
      // console.log(entry.getField('citation').data.join(''));
      const authors = entry.getField('author').data.join('').split(/\s+and\s+/i).map(author => {
        // Match "Last†, First" or "Last, First" format
        const commaFormat = /^([^\s,]+)([†*]*),\s*([^\s,]+)/.exec(author);

        if (commaFormat) {
          const [, lastName, suffix, firstName] = commaFormat;
          return `${firstName} ${lastName}${suffix}`.trim();
        }

        // Return as-is if not in "Last, First" format
        return author.trim();
      }).join(', '); // 将作者姓名连接成字符串

      // const authors = entry.getField('author').data.join('').split(' and ').map((author: string) => author.trim());

      return {
        isShow: entry.getField('bibtex_show')?.data?.join('') ?? '',
        date: `${entry.getField('year')?.data ?? ''}.${entry.getField('month')?.data ?? ''}.${entry.getField('day')?.data ?? ''}`,
        title: entry.getField('title')?.data?.join('') ?? '',
        authors,
        journal: entry.getField('journal')?.data?.join('') ?? '',
        abstract: entry.getField('abstract')?.data?.join('') ?? '',
        figure: entry.getField('preview')?.data?.join('') ?? '',
        keywords: entry.getField('keywords')?.data?.join('').split(';') ?? [],
        links: {
          "Google Scholar": entry.getField('google_scholar')?.data?.join('') ?? '',
          [`PMID:${entry.getField('pmid')?.data?.join('') ?? ''}`]: [
            `https://pubmed.ncbi.nlm.nih.gov/${entry.getField('pmid')?.data?.join('') ?? ''}`,
          ],
          [`DOI:${entry.getField('doi')?.data?.join('') ?? ''}`]: [
            `https://doi.org/${entry.getField('doi')?.data?.join('') ?? ''}`,
          ],
          "Website": entry.getField('website')?.data?.join('') ?? '',
          "HTML": entry.getField('url')?.data?.join('') ?? '',
          "Chinese Report": entry.getField('chinese_report')?.data?.join('') ?? '',
          "pdf": entry.getField('pdf')?.data?.join('') ?? '',
        },
        citation: entry.getField('citation')?.data?.join('') ?? '',
      };
    });
    // console.log(papers)
    // 使用 transformPapersToPublications 来将 papers 按年份聚合
    publications.value = transformPapersToPublications(papers.value);
  } catch (error) {
    console.error('Failed to fetch jsons/04.publications.json:', error);
  }
});

// 复制文本到剪贴板的函数
function handleCopy(text: string): void {
  try {
    navigator.clipboard.writeText(text);
    ElMessage.success('Paper Citation Copied!');
    // console.log('复制成功:', text);
  } catch (err) {
    console.error('复制失败:', err);
    ElMessage.error('复制失败，请手动复制');
  }
}
</script>

<template>
  <!-- 简述 -->
  <div class="wrapper-background"></div>
  <div class="wrapper-sketch">
    <el-row>
      <el-col :span="2"></el-col>
      <el-col :span="20">
        <el-row>
          <el-col class="wrapper-sketch-text" :span="screenWidth > 1200 ? 14 : 24" v-if="publicationsBasic">
            <div class="wrapper-sketch-text-title">Publications</div>
            <div class="wrapper-sketch-text-subtitle">{{ publicationsBasic.subtitle }}</div>
            <h1 class="wrapper-sketch-text-content">{{ publicationsBasic.slogan }}</h1>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2"></el-col>
    </el-row>
  </div>
  <!-- 添加一个可视化统计分析 -->
  <!-- 论文 -->
  <el-row class="publications-wrap" :style="{ 'background-color': !isDark ? '#cdd1d3' : '#131124' }">
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <h2>Click to jump the year</h2>
      <el-check-tag class="publications-wrap-years" size="large" effect="plain"
        v-for="(publication, index) in publications" :key="index" checked @click="scrollToView(publication.year)">{{
          publication.year }}</el-check-tag>
      <el-timeline :id="publication.year" class="publications-papers" v-for="(publication, index) in publications"
        :key="index">
        <!-- Year -->
        <el-timeline-item type="success" size="large" hollow="true">
          <h1>{{ publication.year }} ({{ publication.count }} total)</h1>
        </el-timeline-item>
        <!-- Papers -->
        <el-timeline-item v-for="(paper, index) in publication.papers" :key="index" :timestamp="paper.date"
          placement="top" type="success" size="large" hollow="true">
          <!-- <h3>{{ paper.date }}</h3> -->
          <el-card class="publications-papers-card">
            <el-row>
              <el-col :span="screenWidth > 1600 ? 11 : 24">
                <!-- Figure -->
                <el-image v-if="paper.figure" style="width: 100%; margin-bottom: 20px" :src="paper.figure"
                  :zoom-rate="1.2" :preview-src-list="[paper.figure]" :initial-index="4"
                  hide-on-click-modal="true"></el-image>
                <!-- Tags -->
                <el-tag class="publications-papers-card-tags" v-for="(tag, index) in paper.keywords" :key="index" v-show="paper.keywords[0]">
                  <font-awesome-icon :icon="['fas', 'tag']" /> {{ tag }}</el-tag>
              </el-col>
              <el-col :span="screenWidth > 1600 ? 12 : 24" :offset="screenWidth > 1600 ? 1 : 0">
                <!-- Title -->
                <el-link :underline="false" target="_blank" type="primary" :href="paper.links['HTML']">
                  <span class="publications-papers-card-title">{{paper.title}}</span>
                </el-link>
                <!-- Authors -->
                <div class="publications-papers-card-authors">
                  <font-awesome-icon icon="people-group" /> {{ paper.authors }}
                </div>
                <!-- Journal -->
                <div class="publications-papers-card-journal">
                  <font-awesome-icon icon="book" /> {{ paper.journal }}
                </div>
                <!-- Abstract -->
                <p class="publications-papers-card-abstract">{{ paper.abstract }}</p>
                <!-- Links -->
                <el-link class="publications-papers-card-links" :underline="false" target="_blank" type="primary"
                  v-for="(value, key, index) in paper.links" :key="index" :href="value" v-show="value">
                  <font-awesome-icon :icon="['fas', 'link']" /> {{ key }}
                </el-link>
                <el-link :underline="false" @click="handleCopy(paper.citation)">
                  <font-awesome-icon icon="quote-left" /> {{ paper.citation }}
                </el-link>
              </el-col>
            </el-row>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
</template>
<style scoped>
.publications-intro {
  padding: 100px 0;
  /* border: 1px solid red; */
}

.publications-wrap {
  padding: 50px 0 100px 0;
}

.publications-wrap-years {
  margin: 0 8px 8px 0;
}

.publications-papers {
  padding: 150px 0 0 0;
}

.publications-papers :deep(.el-timeline-item__timestamp) {
  margin: 0 0 20px 0;
  font-size: x-large;
  font-weight: bold;
}

.publications-papers-card-tags {
  margin: 0 12px 10px 0;
}

.publications-papers-card-title {
  font-size: 24px;
  font-weight: bold;
}

.publications-papers-card-authors {
  margin: 15px 0 5px 0;
  font-size: 16px;
  font-weight: bold;
}

.publications-papers-card-journal {
  font-size: 16px;
  font-weight: bold;
}

.publications-papers-card-abstract {
  line-height: 1.5;
}

.publications-papers-card-links {
  font-size: medium;
  margin: 0 20px 10px 0;
}
</style>
