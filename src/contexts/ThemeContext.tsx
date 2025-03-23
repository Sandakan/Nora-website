import { createContext } from "react";

export interface ThemeContextInterface {
  isDarkMode: boolean;
  updateTheme: (theme?: "dark" | "light") => void;
}

const ThemeContext = createContext<ThemeContextInterface>(
  {} as ThemeContextInterface,
);

export default ThemeContext;
