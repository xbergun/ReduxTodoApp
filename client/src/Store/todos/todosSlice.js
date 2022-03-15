import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { todosInitialState } from "./todosInitialState";
import { RootState } from "../store";
import axios from "axios";
const todosTitle = "todos";

export const getTodosAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const res = await axios(`${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`);
    return res.data;
  }
);
export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (title) => {
    const res = await axios.post(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos`,
      title
    );
    return res.data;
  }
);

export const toggleTodoAsync = createAsyncThunk(
  "todos/toggleTodoAsync",
  async ({ id, data }) => {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`,
      data
    );
    return res.data;
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async ({ id }) => {
    const res= await axios.delete(
      `${process.env.REACT_APP_API_BASE_ENDPOINT}/todos/${id}`
    );
    return res.data
  }
);

export const todosSlice = createSlice({
  name: todosTitle,
  initialState: todosInitialState,
  reducers: {
    // toggle : (state, action) => {
    //     const {id} = action.payload;
    //     const item = state.items.find(item => item.id === id);
    //     item.completed = !item.completed;
    // },
    // removeTodo: (state, action) => {
    //   const id = action.payload;
    //   const itemIndex = state.items.findIndex((item) => item.id === id);
    //   state.items.splice(itemIndex, 1);
    // },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((item) => !item.completed);
    },
  },
  extraReducers: {
    //! Get todo
    [getTodosAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [getTodosAsync.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    },
    [getTodosAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    //! Add Todo
    [addTodoAsync.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.addNewTodo.isLoading = false;
    },
    [addTodoAsync.pending]: (state, action) => {
      state.addNewTodo.isLoading = true;
    },
    [addTodoAsync.rejected]: (state, action) => {
      state.addNewTodo.isLoading = false;
      state.addNewTodo.error = action.error.message;
    },
    //! Toggle Todo
    [toggleTodoAsync.fulfilled]: (state, action) => {
      console.log(action.payload);
      const { id, completed } = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items[index].completed = completed;
    },
    [toggleTodoAsync.pending]: (state, action) => {
      state.isLoading = true;
    },
    [toggleTodoAsync.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
    //! Delete Todo
    [deleteTodoAsync.fulfilled]: (state, action) => {
    
      const  id  = action.payload;
      const index = state.items.findIndex((item) => item.id === id);
      state.items.splice(index, 1);
    },
  },
});

export const selectTodos = (state) => state.todos.items;
export const selectFilteredTodos = (state) => {
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }
  return state.todos.items.filter((item) => {
    return state.todos.activeFilter === "completed"
      ? item.completed
      : !item.completed;
  });
};

export const selectActiveFilter = (state) => state.todos.activeFilter;
export const {
  addTodo,
  toggle,
  removeTodo,
  changeActiveFilter,
  clearCompleted,
} = todosSlice.actions;
export default todosSlice.reducer;
