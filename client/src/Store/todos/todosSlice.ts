import { createSlice } from "@reduxjs/toolkit";
import { todosInitialState } from "./todosInitialState";
import {RootState} from '../store'

const todosTitle = "todos"



export const todosSlice = createSlice({
    name: todosTitle,
    initialState: todosInitialState,
    reducers: {
        addTodo: (state, action) => {
            state.items.push(action.payload);
        },
        toggle : (state, action) => {
            const {id} = action.payload;
            const item = state.items.find(item => item.id === id);
            item.completed = !item.completed;
        },
        removeTodo: (state, action) => {
            const id = action.payload;
            const itemIndex = state.items.findIndex(item => item.id === id);
            state.items.splice(itemIndex, 1);
        },
        changeActiveFilter: (state,action) => {
            state.activeFilter = action.payload;
        },
        clearCompleted: (state) => {
            state.items = state.items.filter(item => !item.completed);
        }
    }
});


export const selectTodos = (state :RootState) => state.todos.items
export const selectFilteredTodos = (state:RootState) => {
    if (state.todos.activeFilter === "all") {
        return state.todos.items;
    }
    return state.todos.items.filter(item => {
        return state.todos.activeFilter === "completed" ? item.completed : !item.completed;
    });
        
    

}

export const selectActiveFilter = (state:RootState) => state.todos.activeFilter
export const { addTodo ,toggle,removeTodo,changeActiveFilter,clearCompleted} = todosSlice.actions;
export default todosSlice.reducer