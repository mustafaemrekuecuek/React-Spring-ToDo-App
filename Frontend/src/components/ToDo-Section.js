import { useEffect, useState } from "react";
import '../styleComponents/todoList.css';
import axios from "axios";
import { useLocation } from "react-router-dom";

export default function ToDo_Section({todos , deleteToDo, toDoComplete ,dateFilter}) {
    const [selectedTodo, setSelectedTodo] = useState(false);
    const [error,setError] = useState("");
    const location = useLocation();
    let filteredTodos = todos;

    const toggleDescription = (id) => {
      setSelectedTodo(selectedTodo === id ? null : id);
    };

    useEffect(() => {
        console.log('Todos haben sich geändert', todos);
    }, [todos]); // Abhängigkeit zu `todos`, um Änderungen zu verfolgen


    const handeDelete = async (id) =>  {
      console.log("Deleting ToDo with ID:", id);
      try {
        await deleteToDo(id);
      } catch (error) {
        console.log(error.message);
        setError("Fehlermeldung: " + error.message);
      }
    }

    if(dateFilter){
      filteredTodos = todos.filter(todo => {
        const todoDate = new Date(todo.date).setHours(0, 0, 0, 0);
        return todoDate === dateFilter.setHours(0, 0, 0, 0);
      });
    }

    if(location.pathname == '/Completed') {
      filteredTodos = todos.filter(todo => {
        return todo.completed;
      });
    }

    return (
      <div className="todo-list">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="todo-item">
            <div className="todo-header">
              <span className={`status-indicator ${todo.completed ? 'completed' : 'pending'}`} onClick={() => toDoComplete(todo.id)}></span>
              <span className="todo-title">{todo.title}</span>
              <span className="todo-date">{todo.date}</span>
              <div className="button-container">
                <button className={`${todo.description == '' ? 'hide' : '' }`} onClick={() => toggleDescription(todo.id)}>Details</button>
                <button className="deleteButton" onClick={() => handeDelete(todo.id)}>Löschen</button>
              </div>
            </div>
            <div className={`todo-description ${selectedTodo === todo.id ? 'show' : ''}`}>
              {todo.description}
            </div>
          </div>
        ))}
        {error && <div>{error}</div>}
      </div>
    );
  }
  