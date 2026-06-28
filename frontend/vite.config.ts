// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Vercel deployment (default in @lovable.dev/vite-tanstack-config is cloudflare-module).
  nitro: {
    preset: "vercel",
    // Radix UI imports tslib; Nitro externalizes it by default. Full-trace copies the
    // package into the serverless bundle so Vercel doesn't need a separate install step.
    traceDeps: ["tslib*"],
  },
  vite: {
    ssr: {
      // Keep Radix (and tslib) in the SSR graph so Nitro doesn't emit bare
      // `import "tslib"` in externalized _libs chunks that Vercel can't resolve.
      noExternal: [
        "tslib",
        /^@radix-ui\//,
        "react-remove-scroll",
        "react-remove-scroll-bar",
        "react-style-singleton",
        "aria-hidden",
        "use-callback-ref",
        "use-sidecar",
      ],
    },
    server: {
      // Monorepo: @fontsource lives in ../node_modules; allow Vite dev server to serve those files.
      fs: {
        allow: [".."],
      },
    },
  },
});
