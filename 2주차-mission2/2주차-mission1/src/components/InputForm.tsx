import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';

const InputForm = () => {
  const [text, setText] = useState('');
  const { addTask } = useContext(TaskContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    addTask(text);
    setText('');
  };

  return (
    <form className="todo-container__form" onSubmit={handleSubmit}>
      <input
        className="todo-container__input"
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일 입력"
      />
      <button className="todo-container__button" type="submit">
        할 일 추가
      </button>
    </form>
  );
};

export default InputForm;

