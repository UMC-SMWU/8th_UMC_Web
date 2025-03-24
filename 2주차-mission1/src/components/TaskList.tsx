import { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';

interface TaskListProps {
  title: string;
  isDone: boolean;
}

const TaskList = ({ title, isDone }: TaskListProps) => {
  const { tasks, doneTasks } = useContext(TaskContext);
  const list = isDone ? doneTasks : tasks;

  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul className="render-container__list">
        {list.map((task) => (
          <TaskItem key={task.id} task={task} isDone={isDone} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

