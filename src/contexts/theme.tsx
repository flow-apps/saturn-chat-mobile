import React, {
  useContext,
  useCallback,
  useEffect,
  createContext,
  useMemo,
} from "react";
import { StatusBar, useColorScheme } from "react-native";
import { ThemeProvider } from "styled-components/native";
import { usePersistedState } from "../hooks/usePersistedState";
import nav from "react-native-system-navigation-bar";
import dark from "../styles/themes/dark";
import light from "../styles/themes/light";

interface ThemeControllerContext {
  toggleTheme: () => unknown;
  currentThemeName: string;
}

const ThemeControllerContext = createContext<ThemeControllerContext>(
  {} as ThemeControllerContext
);

const ThemeControllerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const defaultTheme = useColorScheme();
  const [theme, setTheme] = usePersistedState<string>(
    "@SaturnChat:theme",
    defaultTheme
  );
  const toggleTheme = useCallback(() => {
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme]);

  const themes = useMemo(() => {
    return {
      dark,
      light,
    };
  }, []);

  useEffect(() => {
    (async () => {
      await nav.setNavigationColor(
        themes[theme].colors.shape,
        theme !== "light"
      );
    })();

    StatusBar.setBarStyle("light-content");
  }, [theme]);

  return (
    <ThemeControllerContext.Provider
      value={{ toggleTheme, currentThemeName: theme }}
    >
      <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>
    </ThemeControllerContext.Provider>
  );
};

const useThemeController = () => {
  const themeControllerContext = useContext(ThemeControllerContext);

  return themeControllerContext;
};

export { ThemeControllerProvider, useThemeController };
