import {  } from "../store";
import { createSlice } from "@reduxjs/toolkit";
import {getTodosAsync, addTodoAsync, toggleTodoAsync,deleteTodoAsync} from "./todosThunk";
import { todosInitialState } from "./todosInitialState";
import { todosReducers } from "./todosReducers";
const todosTitle = "todos";



export const todosSlice = createSlice({
  name: todosTitle,
  initialState: todosInitialState,
  reducers: todosReducers,
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
      state.isLoading = false;
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
