import { createContext, ReactNode, useContext, useState } from "react";

enum THEME {
  LIGHT = "light",
  DARK = "dark",
}

type TTHME = THEME.LIGHT | THEME.DARK;

interface IThemeContext {
  theme: TTHME;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<TTHME>(THEME.LIGHT);

  const toggleTheme = () => {
    setTheme((prev) => (prev === THEME.LIGHT ? THEME.DARK : THEME.LIGHT));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useTheme을 사용하기 위해서는, 무조건 ThemeProvider로 감싸야 합니다."
    );
  }
  return context;
};
