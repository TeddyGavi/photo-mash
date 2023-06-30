import { createContext } from "react";

export const ThemeContext = createContext({
  toggle: () => {
    isThemeDark: false;
  },
});
