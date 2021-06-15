import React, { useContext, useState } from "react";
import { useCallback } from "react";
import { createContext } from "react";
import { DefaultTheme } from "styled-components";
import { ThemeProvider } from "styled-components/native";
import { usePersistedState } from "../hooks/usePersistedState";
import dark from "../styles/themes/dark";
import light from "../styles/themes/light";

interface ToggleThemeContext {
  toggleTheme: () => unknown;
  currentThemeName: string;
}

const ToggleThemeContext = createContext<ToggleThemeContext>(
  {} as ToggleThemeContext
);

const ToggleThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = usePersistedState<DefaultTheme>(
    "@SaturnChat:theme",
    light
  );
  const toggleTheme = useCallback(() => {
    setTheme(theme.title === "light" ? dark : light);
  }, [theme, theme.title]);

  return (
    <ToggleThemeContext.Provider
      value={{ toggleTheme, currentThemeName: theme.title }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ToggleThemeContext.Provider>
  );
};

const useToggleTheme = () => {
  const toggleThemeContext = useContext(ToggleThemeContext);

  return toggleThemeContext;
};

export { ToggleThemeProvider, useToggleTheme };
