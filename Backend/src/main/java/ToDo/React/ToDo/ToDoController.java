package ToDo.React.ToDo;

import ToDo.React.User.UserRepository;
import io.netty.handler.codec.http.HttpHeaderDateFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("/api/todos")
public class ToDoController {

    @Autowired
    public ToDoService toDoService;
    @Autowired
    public UserRepository userRepository;

    @PostMapping(value = "/create/{usersId}", consumes = "application/json")
    public ResponseEntity<ToDo> createToDo(@RequestBody ToDo newToDo, @PathVariable Long usersId) {
        ToDo createdToDo = toDoService.createToDo(newToDo, usersId);
        if (createdToDo != null) {
            return ResponseEntity.ok(createdToDo);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(value = "/{usersId}")
    public ResponseEntity<List<ToDo>> getToDos(@PathVariable Long usersId) {
        return ResponseEntity.ok(toDoService.getAllToDos(usersId));
    }
    @GetMapping(value = "/today/{usersId}")
    public ResponseEntity<List<ToDo>> getTodaysToDos(@PathVariable Long usersId) {
        return ResponseEntity.ok(toDoService.getTodaysToDos(usersId));
    }
    @PutMapping(value = "/complete/{todoId}")
    public ResponseEntity<String> completeToDo(@PathVariable Long todoId) {
        try {
            toDoService.completeToDo(todoId);
            return new ResponseEntity<String>("ToDo Status geändert!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(value = "/delete/{todoId}")
    public ResponseEntity<String> deleteToDo(@PathVariable Long todoId) {
        try {
            toDoService.deleteToDo(todoId);
            return new ResponseEntity<String>("ToDo erfolgreich gelöscht!", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
        }
    }
}