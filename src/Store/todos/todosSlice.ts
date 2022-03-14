import { createSlice } from "@reduxjs/toolkit";
import { todosInitialState } from "./todosInitialState";


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

export const { addTodo ,toggle,removeTodo,changeActiveFilter,clearCompleted} = todosSlice.actions;
export default todosSlice.reducer