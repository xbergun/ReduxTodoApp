import { useSelector, useDispatch } from "react-redux";
import { toggle, removeTodo } from "../../Store/todos/todosSlice";

let filtered = [];
const TodoList = () => {
  const items = useSelector((state) => state.todos.items);
  const activeFilter = useSelector((state) => state.todos.activeFilter);
  console.log("TodoList ", activeFilter);
  const dispatch = useDispatch();


    filtered = items
    if (activeFilter !== "all") {
        filtered = items.filter((todo) => activeFilter === "active" ? todo.completed ===false &&todo: todo.completed === true&&todo);
    }
  

  return (
    <>
    
      <ul className="todo-list">
        {filtered.map((item) => (
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
