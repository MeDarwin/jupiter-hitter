import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
    if (command === "serve") {
        return {
            base: "/", //dev base url
        }
    }
    if (command === "build") {
        return {
            base: "/jupiter-hitter", //repo name for deploy
        }
    }
})