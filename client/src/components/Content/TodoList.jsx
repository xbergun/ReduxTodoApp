import { useSelector, useDispatch } from "react-redux";
import {
  toggle,
  removeTodo,
  selectFilteredTodos,
  getTodosAsync,
  toggleTodoAsync,
  deleteTodoAsync
} from "../../Store/todos/todosSlice";
import { useEffect } from "react";
import Loading from "components/Loading/Loading";
import Error from "components/Error/Error";

const TodoList = () => {
  const dispatch = useDispatch();
  const filteredTodos = useSelector(selectFilteredTodos);
  const isLoading = useSelector((state) => state.todos.isLoading);
  const error = useSelector((state) => state.todos.error);

  useEffect(() => {
    dispatch(getTodosAsync());
  }, [dispatch]);

  const handleToggle = async (id, completed) => {
      await dispatch(toggleTodoAsync({id, data: {completed}}));
  };

  const handleDelete = async (id) => {
    await dispatch(deleteTodoAsync(id));
  }
  
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error message={"Error"} />;
  }

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
                  handleToggle(item.id, !item.completed)
                }
              />
              <label>{item.title}</label>
              <button
                className="destroy"
                onClick={handleDelete}
              ></button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default TodoList;
