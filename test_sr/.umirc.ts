import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    { path: "/login", component: "login", layout: false },
    { path: '/*', component: '@/pages/404' },
  ],
  npmClient: 'pnpm',
  define: { 'process.env.BASE_API': process.env.BASE_API },
  plugins: ['@umijs/plugins/dist/dva'],
  dva: {}
});
