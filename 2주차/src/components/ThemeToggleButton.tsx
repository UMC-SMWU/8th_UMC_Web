import { useTheme } from "../context/ThemeProvider";
import './ThemeToggleButton.css';

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button onClick={toggleTheme}
        className="theme-toggle-btn" >
            {theme === "LIGHT" ? "🌙 다크 모드" : "☀️ 라이트 모드"}
        </button>
    );
};

export default ThemeToggleButton;