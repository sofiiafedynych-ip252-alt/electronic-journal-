import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  // Налаштовуємо точки входу для всіх наших HTML-сторінок
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        contacts: resolve(__dirname, "contacts.html"),
        signin: resolve(__dirname, "sign-in.html"),
        dashboard: resolve(__dirname, "dashboard.html"),
        detail: resolve(__dirname, "topic-detail.html"),
        admin: resolve(__dirname, "admin.html"),
      },
    },
  },
  // Налаштування сервера розробки
  server: {
    port: 3000,
    open: true, // Автоматично відкривати сайт у браузері при запуску
  },
});