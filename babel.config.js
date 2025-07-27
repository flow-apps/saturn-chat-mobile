module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      "react-native-reanimated/plugin",
      "lodash",
      [
        "module-resolver",
        {
          root: [".", "./src"],
          extensions: [".ts", ".tsx", ".jsx", ".js", ".json"],
          alias: {
            "@components": "./src/components",
            "@configs": "./src/configs",
            "@hooks": "./src/hooks",
            "@contexts": "./src/contexts",
            "@pages": "./src/pages",
            "@assets": "./src/assets",
            "@utils": "./src/utils",
            "@routes": "./src/routes",
            "@type": "./types",
            "@services": "./src/services",
            "@styles": "./src/styles",
            "@secrets": "./secrets.json",
            "@config": "./src/config.ts"
          },
        },
      ],
    ],
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["transform-remove-console", 'react-native-paper/babel'], //removing consoles.log from app during release (production) versions
      },
    },
  };
};
