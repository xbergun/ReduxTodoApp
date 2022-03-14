import { useSelector, useDispatch } from "react-redux";
import {
  toggle,
  removeTodo,
  selectFilteredTodos,
} from "../../Store/todos/todosSlice";

const TodoList = () => {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);

  return (
    <>
      <ul className="todo-list">
        {filteredTodos.map((item) => (
          <li key={item.id} className={item.completed ? "completed" : ""}>
            <div className="view">
              <input
                className="toggle"
                type="checkbox"
                onChange={() =>
                  dispatch(
                    toggle({
                      id: item.id,
                    })
                  )
                }
              />
              <label>{item.title}</label>
              <button
                className="destroy"
                onClick={() => dispatch(removeTodo({ id: item.id }))}
              ></button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
