// import { fileURLToPath, URL } from "node:url";
import path from "path";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

// 按需导入-自动导入 Element Plus
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

const pathSrc = path.resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element/light.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: "sass",
        }),
      ],
    }),
  ],
  base: "./", // 设置打包路径
  resolve: {
    alias: {
      // "@": fileURLToPath(new URL("./src", import.meta.url)),
      "~/": `${pathSrc}/`,
    },
  },
  // 添加跨域
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: 'http://localhost:3000/', // 跨域地址
        // target: "http://172.20.0.12:3000/", // 跨域地址
        changeOrigin: true, // 支持跨域
        rewrite: (path) => path.replace(/^\/api/, ""), // 重写路径，替换/api
      },
    },
  },
});
