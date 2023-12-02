import axios from "axios";
import { useEffect, useState } from "react";
import { navigate, useLocation, useNavigate } from "react-router-dom";
import ToDo_Section from "./ToDo-Section.js";
import ToDoInput from "./ToDoInput.js";

export default function Home({date}) {
    const [user, setUser] = useState(null);
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setSelectedDate(date.date);
    }, [date]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = localStorage.getItem('id');
                if (id) {
                    const response = await axios.get(`http://localhost:8080/api/users/${id}`, {
                        headers: {
                            'content-type': `application/json`
                        }});
                    setUser(response.data);
                    setIsLoading(false);
                } else {
                    navigate("/login");
                }
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        }
        fetchData();
    }, [navigate]); // Abhängigkeit `navigate` hinzugefügt

    useEffect(() => {
        const fetchTodaysTodos = async () => {
            const id = localStorage.getItem('id');
            if (id) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/todos/today/${id}`);
                    setTodos(response.data);
                } catch (error) {
                    console.error(error);
                    setError("Fehler beim Laden der Todos");
                }
            }
        };
        fetchTodaysTodos();
    }, []); // Leere Abhängigkeitsliste
    
    const addTodo = async (newTodo) => {
        const id = localStorage.getItem('id'); 
        try {
            const response = await axios.post(`http://localhost:8080/api/todos/create/${id}`, newTodo, {
                headers: {
                    "content-type": "application/json",
                }
            });
            setTodos([...todos, response.data]); // Aktualisiere den Zustand mit dem neuen Todo
        } catch (error) {
            console.error(error);
            setError("Fehler beim Hinzufügen des Todos");
        }
    };

    const deleteToDo = async (todoId) => {
        console.log(todoId);
        try {
            const id = Number(todoId);
          await axios.delete(`http://localhost:8080/api/todos/delete/${id}`);
          setTodos(todos.filter(todo => todo.id !== id));
        } catch (error) {
          console.error(error);
          setError(error);
        }
      };

      const toDoComplete = async (id) => {
        const todoID = Number(id);
        try {
          await axios.put(`http://localhost:8080/api/todos/complete/${todoID}`);
          setTodos(todos.map(todo => {
            if (todo.id === id) {
              return { ...todo, completed: !todo.completed };
            }
            return todo;
          }));
        } catch(error) {
          console.error(error.message);
          setError("Fehlermeldung: " + error.message);
        }
      }

    if(isLoading){
        return <div>Lädt...</div>
    }

    if (error) {
        return <div>Fehler beim Laden der Daten: {error.message}</div>;
    }

    let header = "";

    if(date.date != null){
        header = "Aufgaben von " + date.content;
    }

    if(date.date == null){
    header = "Alle ToDos:";
    }

    if(location.pathname == '/Completed') {
        header = "Alle erledigten ToDos:";
    }

    return (
        <div>
            <div className="main-content">
                <div className="welcome-container" >
                    <h1>Willkommen in meiner ToDo-App, {user.fullname}!</h1>
                    <p>Organisieren Sie Ihre Aufgaben effizient und einfach.</p>
                    <button>Loslegen</button>
                </div>
                <ToDoInput addTodo={addTodo}/>
                <h2 className="welcome-container">{header}</h2>
                <ToDo_Section todos={todos} deleteToDo={deleteToDo} toDoComplete={toDoComplete} dateFilter={selectedDate}/>
            </div>
        </div>
    );
}