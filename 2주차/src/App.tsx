import Todo from './components/Todo';
import Navbar from './components/Navbar';
import { TodoProvider } from './context/TodoContext';
import { ThemeProvider } from './context/ThemeProvider';
import './index.css';

function App() : Element {
  return (
    <ThemeProvider> 
      <TodoProvider>
        <Navbar />
        <Todo />
      </TodoProvider>
    </ThemeProvider>
    
  );
}

export default App;