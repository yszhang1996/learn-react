import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index", },
    { path: "/docs", component: "docs" },
    { path: "/login", component: "login", layout: false },
    { path: "/test", component: "test", layout: false },
    {
      path: "/dataAllViewChart", component: "dataAllViewChart", title: '资源全景图', layout: false, wrappers: ['@/wrappers/auth'],
      routes: [
        { path: 'dataResources', component: 'dataAllViewChart/dataResources', title: '数据资源', layout: false, wrappers: ['@/wrappers/auth'] },
        { path: 'diseaseSpectrum', component: 'dataAllViewChart/diseaseSpectrum', title: '疾病谱', layout: false, wrappers: ['@/wrappers/auth'] },
        { path: '', redirect: '/dataAllViewChart/dataResources', component: 'dataAllViewChart', }
      ]
    },
    { path: '/*', component: '@/pages/404' },
  ],
  npmClient: 'pnpm',
  define: { 'process.env.BASE_API': process.env.BASE_API },
  plugins: ['@umijs/plugins/dist/dva'],
  dva: {},
  mock: {},
});
