import * as Localize from "expo-localization";

export function convertBytesToMB(bytes: number) {
  const size = bytes / 1024 / 1024;

  return String((size >= 1 ? size : size * 1024).toFixed(2)).replace(
    ".",
    Localize.getLocales().shift().decimalSeparator
  ) + (size >= 1 ? "MB" : "KB")
}
