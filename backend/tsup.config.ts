import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  target: 'node20',
  outDir: 'dist',
  clean: true,
  // Prisma client must stay external — it loads native query engine binaries at runtime.
  external: ['@prisma/client'],
})
