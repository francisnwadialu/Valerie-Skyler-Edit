import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemas/index.mjs";

export default defineConfig({
  name: "valerie-skyler",
  title: "Valerie Skyler Studio",
  projectId: "pls29s2l",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
});
