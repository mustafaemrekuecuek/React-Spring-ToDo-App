import React, { useState } from 'react';

import '../styleComponents/ToDoInput.css';

const ToDoInput = ({ addTodo }) => {
  const [todo, setTodo] = useState({
    title: '',
    description: '',
    date: ''
  });

  const [error,setError] = useState("");

  const handleChange = (e) => {
    setTodo({
      ...todo,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTodo(todo); 
      setTodo({
        title: '',
        description: '',
        date: ''
      });
    } catch (error) {
      console.log(error.message);
      setError("Fehlermeldung: " + error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <input 
          type="text" 
          name="title" 
          placeholder="Titel"
          value={todo.title} 
          onChange={handleChange} 
          required
        />
      </div>
      <div className="form-group">
        <input 
          type="date" 
          name="date"
          value={todo.date} 
          onChange={handleChange} 
        />
      </div>
      <div className="form-group">
        <textarea 
          name="description" 
          placeholder="Beschreibung"
          value={todo.description} 
          onChange={handleChange}
        />
      </div>
      {error && <div>{error}</div>}
      <button type="submit">Hinzufügen</button>
    </form>
  );
};

export default ToDoInput;
