import './App.css';
import InputForm from './components/InputForm';
import TaskList from './components/TaskList';
import { TaskProvider } from './context/TaskContext';

function App() {
  return (
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
  );
}

export default App;

