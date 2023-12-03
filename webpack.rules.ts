import type { ModuleOptions } from "webpack";

export const rules: Required<ModuleOptions>["rules"] = [
  {
    test: /native_modules[/\\].+\.node$/,
    use: "node-loader",
  },
  {
    test: /[/\\]node_modules[/\\].+\.(m?js|node)$/,
    parser: { amd: false },
    use: {
      loader: "@vercel/webpack-asset-relocator-loader",
      options: {
        outputAssetBase: "native_modules",
      },
    },
  },
  {
    test: /\.tsx?$/,
    exclude: /(node_modules|\.webpack)/,
    use: {
      loader: "ts-loader",
      options: {
        transpileOnly: true,
      },
    },
  },
  {
    test: /\.vue$/,
    use: "vue-loader",
  },
  {
    test: /\.css$/,
    use: [{ loader: "vue-style-loader" }, { loader: "style-loader" }, { loader: "css-loader" }],
  },
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  },
  {
    test: /\.s[ac]ss$/i,
    use: [
      { loader: "vue-style-loader" },
      {
        loader: "style-loader",
        options: {
          esModule: false,
        },
      },
      { loader: "css-loader" },
      {
        loader: "sass-loader",
        options: { additionalData: "@import './src/assets/scss/_main.scss';" },
      },
    ],
  },
];
