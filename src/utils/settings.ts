import { ISetting } from "@type/interfaces";

export const getSettingValue = (settings: ISetting[], name: string) => {
  if (!settings?.length) return undefined;

  const setting = settings.find((setting) => setting.setting_name === name);

  if (!setting) return undefined;

  return converterStringWithType(setting.setting_value, setting.typeof_value);
};

export const converterStringWithType = (value: any, type: string): any => {
  switch (type) {
    case "boolean":
      return value === "true";

    case "number":
      return Number(value);

    case "string":
      return String(value);

    default:
      return String(value);
  }
};
