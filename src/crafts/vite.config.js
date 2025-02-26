import { sveltekit } from "@sveltejs/kit/vite"
import { defineConfig } from "vite"
import { viteStaticCopy } from "vite-plugin-static-copy"

export default defineConfig({
  plugins: [
    sveltekit(),
    viteStaticCopy({
      targets: [
        {
          src: "../../crafts-info-gen/**/*.{png,jpg,jpeg,webp}",
          dest: "thumbnails",
          rename: (name, ext, fullPath) => {
            const fullPathSplit = fullPath.split("/")
            const postSlug = fullPathSplit[fullPathSplit.length - 2]
            console.log("[viteStaticCopy]", `${postSlug}-${name}.${ext}`)
            return `${postSlug}-${name}.${ext}`
          },
        },
      ],
    }),
  ],
  build: {
    outDir: "../../build",
    emptyOutDir: true,
  },
})
