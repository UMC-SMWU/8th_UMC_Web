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
        className={`theme-toggle-button text-base rounded-md duration-300 ${
          theme === "light" ? "bg-white text-black" : "bg-black text-white"
        }`}
        onClick={toggleTheme}
      >
        {theme === "light" ? "라이트 모드 ☀️" : "다크 모드 🌙"}
      </button>
    </nav>
  );
};

export default ThemeToggleNavBar;
