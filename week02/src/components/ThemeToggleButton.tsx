import clsx from 'clsx';
import { THEME, useTheme } from '../context/ThemeProvider'

function ThemeToggleButton() {
    const { theme, toggleTheme } = useTheme();

    const isLightMode = theme === THEME.LIGHT;

    return (
        <button onClick={toggleTheme}
            className={clsx('px-4 py-2 mt-4 rounded-md transition-all', {
                'bg-gray-200 text-gray-900': isLightMode,
                'bg-gray-800 text-gray-100': !isLightMode,
            })}
        >
            {isLightMode ? '🌕 DARK' : '✨ LIGHT'}
        </button>
    );
}

export default ThemeToggleButton