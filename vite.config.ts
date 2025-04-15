import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 4000,
    host: "127.0.0.1", // Required to access the server when it is running in a devcontainer.
  },
});
