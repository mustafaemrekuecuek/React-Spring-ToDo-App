package ToDo.React.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public boolean createUser(User newUser) {
        if(newUser.getFullname().length() < 3 || newUser.getPassword().length() < 5 ||newUser.getUsername().length() < 4) return false;
        try {
            User createdUser = new User(newUser.getUsername(), newUser.getPassword(), newUser.getFullname());
            userRepository.save(createdUser);
            return true;
        } catch (NullPointerException e){
            return false;
        }
    }
    public boolean login(String username, String password){
        User loginUser = userRepository.findByUsername(username);
        return loginUser != null && loginUser.getPassword().equals(password);
    }


    public boolean updateUser(User userToUpdate) {
        try {
            userRepository.save(userToUpdate);
            return true;
        } catch (NullPointerException e) {
            return false;
        }
    }

    public boolean deleteUser(Long id) {
        try {
            userRepository.deleteById(id);
            return true;
        } catch (NullPointerException e) {
            return false;
        }
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        Optional<User> user = userRepository.findById(id);
        return (user.isPresent()) ? user.get() : null;
    }
    public User getUserByUsername(String username){
        try {
            return userRepository.findByUsername(username);
        } catch (NullPointerException e){
            return null;
        }
    }
}
