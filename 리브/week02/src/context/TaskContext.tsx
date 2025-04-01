import { createContext, useState, ReactNode } from 'react';

export interface Task {
  id: number;
  text: string;
}

interface TaskContextType {
  tasks: Task[];
  doneTasks: Task[];
  addTask: (text: string) => void;
  completeTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

export const TaskContext = createContext<TaskContextType>({} as TaskContextType);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [doneTasks, setDoneTasks] = useState<Task[]>([]);

  const addTask = (text: string) => {
    const newTask = { id: Date.now(), text };
    setTasks((prev) => [...prev, newTask]);
  };

  const completeTask = (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setDoneTasks((prev) => [...prev, task]);
  };

  const deleteTask = (id: number) => {
    setDoneTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, doneTasks, addTask, completeTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

