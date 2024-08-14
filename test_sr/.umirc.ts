import { defineConfig } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/docs", component: "docs" },
    { path: "/login", component: "login" },
  ],
  npmClient: 'pnpm',
  define: { 'process.env.BASE_API': process.env.BASE_API }
});
