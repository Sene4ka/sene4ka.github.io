import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    base: '/lab3/',
    build: {
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, 'index.html'),
                catalog: path.resolve(__dirname, 'catalog/index.html'),
                blog: path.resolve(__dirname, 'blog/index.html'),
                about: path.resolve(__dirname, 'about/index.html'),
            },
        },
    },
});