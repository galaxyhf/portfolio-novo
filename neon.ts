import { defineConfig } from "@neon/config/v1";

export default defineConfig({
  auth: true,
  buckets: {
    "project-images": {
      access: "public_read",
    },
  },
  branch: (branch) => ({
    protected: branch.name === "main",
  }),
});
