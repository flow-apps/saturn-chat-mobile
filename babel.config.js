module.exports = function (api) {
  api.cache(true);
  return {
    plugins: ["react-native-reanimated/plugin", "lodash"],
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["transform-remove-console"], //removing consoles.log from app during release (production) versions
      },
    },
  };
};
