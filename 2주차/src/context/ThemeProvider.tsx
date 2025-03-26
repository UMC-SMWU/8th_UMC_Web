import { createContext, useContext, useEffect, useState, PropsWithChildren } from "react";

export enum THEME {
    LIGHT = "LIGHT",
    DARK = "DARK",
}

type TTheme = THEME.LIGHT | THEME.DARK;

interface IThemeContext {
    theme: TTheme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<TTheme>(() => {
        return (localStorage.getItem("theme") as TTheme) || THEME.LIGHT;
    });

    useEffect(() => {
        if (theme === THEME.DARK) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT);
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
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};