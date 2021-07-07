import * as Localize from "expo-localization";

export function convertBytesToMB(bytes: number) {
  return String((bytes / 1024 / 1024).toFixed(2)).replace(
    ".",
    Localize.decimalSeparator
  );
}
