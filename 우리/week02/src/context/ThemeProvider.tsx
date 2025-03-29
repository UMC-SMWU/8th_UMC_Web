import { createContext, PropsWithChildren, useContext, useState } from "react";

export enum THEME {
    LIGHT = "LIGHT",
    DARK = "DARK",
}

type TTHEME = THEME.LIGHT | THEME.DARK

interface IThemeContext {
    theme: THEME.LIGHT | THEME.DARK;
    toggleTheme : () => void;
};


export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

// 이게 우산, 우산 안에 들어갈 children
export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<TTHEME>(THEME.LIGHT);

    const toggleTheme = () => {
        setTheme((prevTheme) => 
            prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT
        );
    }

    return (
        <ThemeContext.Provider value={{ theme: theme, toggleTheme: toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if((!context)) {
        throw new Error("Cannot find ThemeProvider");
    }

    return context;
}