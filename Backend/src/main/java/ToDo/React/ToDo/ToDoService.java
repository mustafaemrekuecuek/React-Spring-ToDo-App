package ToDo.React.ToDo;

import ToDo.React.User.User;
import ToDo.React.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ToDoService {
    @Autowired
    public ToDoRepository toDoRepository;

    @Autowired
    public UserRepository userRepository;

    public ToDo createToDo(ToDo newToDo, Long id) {
        try {
            User user = userRepository.getById(id);
            user.getToDoList().add(newToDo);
            newToDo.setUser(user);
            toDoRepository.save(newToDo);
            userRepository.save(user);
            return newToDo;
        } catch( NullPointerException e){
            return null;
        }
    }

    public List<ToDo> getAllToDos(Long id) {
        return userRepository.getById(id).getToDoList();
    }

    public void deleteToDo(Long toDoId){
        ToDo toDo = toDoRepository.findById(toDoId).get();
        User user = toDo.getUser();

        user.getToDoList().remove(toDo);
        toDoRepository.delete(toDo);;
        userRepository.save(user);
    }

    public List<ToDo> getTodaysToDos(Long userId) {
        LocalDate today = LocalDate.now();
        return toDoRepository.findToDosBySpecificDate(today,userId);
    }

    public void completeToDo(Long ToDoId) {
        try {
            ToDo todo = toDoRepository.findById(ToDoId).get();
            todo.setCompleted(!todo.isCompleted());
            User user = todo.getUser();
            toDoRepository.save(todo);
            userRepository.save(user);
        } catch (Exception e) {
        }
    }
}