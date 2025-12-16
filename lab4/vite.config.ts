// @ts-nocheck
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    base: '/lab4/',
    publicDir: 'public',
    build: {
        outDir: 'dist',
        sourcemap: true,
        emptyOutDir: true
    }
})
