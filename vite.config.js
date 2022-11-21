import { defineConfig } from "vite";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";
import alias from "@rollup/plugin-alias";

export default defineConfig({
  plugins: [
    wasm(),
    topLevelAwait(),
    alias({
      entries: [
        { find: "@types", replacement: "./src/types" },
        { find: "@objects", replacement: "./src/objects" },
      ],
    }),
  ],
});
