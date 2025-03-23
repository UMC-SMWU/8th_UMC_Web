import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggleNavBar = () => {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "light" ? "#f1f1f1" : "#333";
  }, [theme]);

  return (
    <nav className="theme-navbar">
      <button
        style={{
          backgroundColor: theme === "light" ? "#ffffff" : "#000000",
          color: theme === "light" ? "#333333" : "#ffffff",
        }}
        className="theme-toggle-button"
        onClick={toggleTheme}
      >
        {theme === "light" ? "라이트 모드 ☀️" : "다크 모드 🌙"}
      </button>
    </nav>
  );
};

export default ThemeToggleNavBar;
