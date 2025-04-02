import './App.css';
import DarkModeToggle from './components/DarkModeToggle';
import InputForm from './components/InputForm';
import TaskList from './components/TaskList';
import { DarkModeProvider } from './context/DarkModeContext';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
    <DarkModeProvider>
      <DarkModeToggle />
    <TaskProvider>
    <div className="todo-container">
        <h1 className="todo-container__header">JIWON TODO</h1>
        <InputForm />
        <div className="render-container">
          <TaskList title="할 일" isDone={false} />
          <TaskList title="완료" isDone={true} />
        </div>
      </div>
    </TaskProvider>
    </DarkModeProvider>
  );
}

export default App;