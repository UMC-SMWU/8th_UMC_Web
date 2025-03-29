import './App.css';
import Todo from './components/Todo';
import Navbar from './components/Navbar';
import { TodoProvider } from './context/TodoContext';
import { ThemeProvider } from './context/ThemeProvider';

function App() {
    return (
        <>
        <TodoProvider>
            <ThemeProvider>
                <div className='min-h-screen'>
                    <Navbar />
                    <div className='w-full'>
                        <Todo />
                    </div>
                </div>
            </ThemeProvider>
        </TodoProvider>
        </>
    );
}

export default App;
