import { useDarkMode } from '../context/DarkModeContext';

function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 px-3 py-1 bg-gray-800 text-white dark:bg-white dark:text-gray-900 rounded"
    >
      {isDark ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}

export default DarkModeToggle;
