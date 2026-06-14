import { defineConfig } from "astro/config";

const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "anita-tsai-portfolio";
const base = process.env.PUBLIC_BASE_PATH ?? `/${repoName}`;

export default defineConfig({
  output: "static",
  site: process.env.PUBLIC_SITE_URL ?? "https://caballetsai.github.io",
  base,
  trailingSlash: "always",
});
