import { defineConfig } from "prisma/config";

export default defineConfig({
  datasource: {
    provider: "sqlite",
    url: "file:./prisma/dev.db",
  },
  generator: {
    provider: "prisma-client-js",
    output: "./prisma/generated/client",
  },
});
