import { THEME, useTheme } from "../context/ThemeProvider";
import clsx from 'clsx';

export default function ThemeContent():Element {
    const {theme, toggleTheme} = useTheme();
    const isLightMode = theme === THEME.LIGHT; 
    return (
    <div className = {clsx(
        'p-4 h-dvh w-full', isLightMode ? 'bg-white' : 'bg-gray-800')}>
    ThemeContent</div>);
}