import { createContext } from 'react';

export interface ThemeContextInterface {
	isDarkMode: boolean;
	toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextInterface>({} as ThemeContextInterface);

export default ThemeContext;
