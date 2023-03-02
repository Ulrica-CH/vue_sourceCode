export default {
  input: "./src/index.js",
  output: {
    file: "./dist/vue.js",
    // 全局名称
    name: "Vue",
    // 打包后的格式 umd支持esm cjs iife
    format: "umd",
    // 调试
    sourcemap: true,
  },
  plugins: [
    {
      babel: {
        exclude: "node_modules/**",
      },
    },
  ],
};
