import "./App.css";
import { TodoProvider } from "./context/TodoContext";
import Todo from "./components/Todo";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggleNavBar from "./components/ThemeNavBar";

function App() {
  return (
    <ThemeProvider>
      <ThemeToggleNavBar />
      <TodoProvider>
        <Todo />
      </TodoProvider>
    </ThemeProvider>
  );
}

export default App;
