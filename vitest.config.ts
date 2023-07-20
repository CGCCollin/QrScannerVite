/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    name: 'demo',
    browser: {
        enabled: true,
        name: 'chrome',
        headless: false,
    },
    root: './',
    testTimeout: 60000,
  },
})