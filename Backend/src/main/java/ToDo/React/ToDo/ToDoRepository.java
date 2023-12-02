package ToDo.React.ToDo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ToDoRepository extends JpaRepository<ToDo, Long> {
    @Query(value = "SELECT * FROM To_Do WHERE date = :specificDate AND user_id = :userId", nativeQuery = true)
    List<ToDo> findToDosBySpecificDate(@Param("specificDate") LocalDate specificDate,@Param("userId") Long userId);
}