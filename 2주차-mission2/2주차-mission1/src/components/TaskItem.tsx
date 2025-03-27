import { useContext } from 'react';
import { TaskContext, Task } from '../context/TaskContext';

interface TaskItemProps {
  task: Task;
  isDone: boolean;
}

const TaskItem = ({ task, isDone }: TaskItemProps) => {
  const { completeTask, deleteTask } = useContext(TaskContext);

  const handleClick = () => {
    isDone ? deleteTask(task.id) : completeTask(task.id);
  };

  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{task.text}</span>
      <button
        className="render-container__item-button"
        style={{ backgroundColor: isDone ? '#dc3545' : '#28a745' }}
        onClick={handleClick}
      >
        {isDone ? '삭제' : '완료'}
      </button>
    </li>
  );
};

export default TaskItem;

