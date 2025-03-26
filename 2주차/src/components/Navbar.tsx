import ThemeToggleButton from './ThemeToggleButton';
import { THEME, useTheme } from '../context/ThemeProvider';
import clsx from 'clsx';

export default function Navbar(): Element {
    const { theme } = useTheme();
    const isLightMode = theme === THEME.LIGHT;

    return (
        <nav className={clsx(
            'p-4 w-full flex justify-end',
            isLightMode ? 'bg-white' : 'bg-gray-800'
        )}>

            
                <ThemeToggleButton />
        </nav>
    );
}
