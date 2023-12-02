package ToDo.React.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.List;

@CrossOrigin(value = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS512); // Generieren des Schlüssels


    @PostMapping(value = ("/create") ,consumes = "application/json", produces = "application/json")
    public ResponseEntity<String> createUser(@RequestBody User newUser){
        if (userService.createUser(newUser)) {
            return new ResponseEntity<>("User wurde erstellt!", HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping(value = "/login", consumes = "application/json")
    public ResponseEntity<User> login(@RequestBody LoginDto loginDetails) {
        if (userService.login(loginDetails.getUsername(), loginDetails.getPassword())) {
            User user = userService.getUserByUsername(loginDetails.getUsername());

            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    }
    @DeleteMapping
    public ResponseEntity<String> deleteUser(@RequestBody User userToDelete){
        if (userService.deleteUser(userToDelete.getId())) {
            return new ResponseEntity<>("User wurde erfolgreich gelöscht",HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping(value = "/{userId}")
    public ResponseEntity<User> getCurrentUser(@PathVariable Long userId){
        User user = userService.getUserById(userId);
        if (user != null) {
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping
    public ResponseEntity<String> updateUser(@RequestBody User userToUpdate){
        if (userService.updateUser(userToUpdate)) {
            return new ResponseEntity<>("User wurde erfolreich geupdatet",HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
