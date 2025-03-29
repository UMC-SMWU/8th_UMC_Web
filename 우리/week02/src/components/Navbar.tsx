import clsx from "clsx";
import { THEME, useTheme } from "../context/ThemeProvider";
import ThemeToggleButton from "./ThemeToggleButton";

const Navbar = () => {
    // 구조분해 할당
    const { theme } = useTheme();

    const isLightMode = theme === THEME.LIGHT;

    return (
        <div className={clsx(
            'p-4 flex justify-end',
        )}>
            <ThemeToggleButton />
        </div>
    )
}

export default Navbar