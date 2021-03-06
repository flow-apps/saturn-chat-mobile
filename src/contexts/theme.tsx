import React, { useContext, useCallback, useEffect, createContext } from "react";
import { useColorScheme } from "react-native";
import { DefaultTheme } from "styled-components";
import { ThemeProvider } from "styled-components/native";
import { usePersistedState } from "../hooks/usePersistedState";
import nav from "react-native-system-navigation-bar"
import dark from "../styles/themes/dark";
import light from "../styles/themes/light";

interface ThemeControllerContext {
  toggleTheme: () => unknown;
  currentThemeName: string;
}

const ThemeControllerContext = createContext<ThemeControllerContext>(
  {} as ThemeControllerContext
);

const ThemeControllerProvider: React.FC = ({ children }) => {
  const defaultTheme = useColorScheme();
  const [theme, setTheme] = usePersistedState<DefaultTheme>(
    "@SaturnChat:theme",
    defaultTheme === "light" ? light : dark
  );
  const toggleTheme = useCallback(() => {
    setTheme(theme.title === "light" ? dark : light);
  }, [theme, theme.title]);

  useEffect(() => {
    (async () => {
      await nav.setNavigationColor(theme.colors.shape, theme.title !== "light")
    })()
  }, [theme])

  return (
    <ThemeControllerContext.Provider
      value={{ toggleTheme, currentThemeName: theme.title }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeControllerContext.Provider>
  );
};

const useThemeController = () => {
  const themeControllerContext = useContext(ThemeControllerContext);

  return themeControllerContext;
};

export { ThemeControllerProvider, useThemeController };
