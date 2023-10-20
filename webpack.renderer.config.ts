import type { Configuration } from "webpack";

import { rules } from "./webpack.rules";
import { plugins } from "./webpack.plugins";

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  devtool: "inline-source-map",
  plugins,
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".vue"],
    alias: {
      "vue-i18n": "vue-i18n/dist/vue-i18n.esm-browser.prod.js",
    },
  },
};
