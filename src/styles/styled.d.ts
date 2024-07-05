import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    title: string;
    colors: {
      black: string;
      white: string;
      background: string;
      shape: string;
      light_gray: string;
      dark_gray: string;
      primary: string;
      light_primary: string;
      secondary: string;
      light_secondary: string;
      dark_heading: string;
      light_heading: string;
      red: string;
      green: string;
    };
  }
}
