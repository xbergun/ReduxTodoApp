import { useDispatch } from "react-redux";
import {  addTodoAsync } from "Store/todos/todosThunk";
import { useState } from "react";
import { useSelector } from "react-redux";
import Error from "components/Error/Error";
import Loading from "components/Loading/Loading";

const Form = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.todos.addNewTodo.isLoading);
  const error = useSelector((state) => state.todos.addNewTodo.error);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addTodoAsync({ title }));
    setTitle("");
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };
 

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", alignItems: "center" }}
      >
        <input
        disabled={isLoading}
          className="new-todo"
          value={title}
          placeholder="What needs to be done?"
          onChange={handleChange}
          autoFocus
        />
        {isLoading && <Loading/> }
        {error && <Error message={"Hata"} />}
       
      </form>
    </>
  );
};
export default Form;
