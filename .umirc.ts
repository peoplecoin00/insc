import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  favicon: '/favicon.ico',
  title: "ETH INSC",
  routes: [
    { path: '/', component: '@/pages/index' },
    // { path: '/eth', component: '@/pages/eth/index' },
  ],
  devServer: {
    port: 1001,
  },
  outputPath:'/docs',
  fastRefresh: {},
});
