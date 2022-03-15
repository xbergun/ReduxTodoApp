
export const todosReducers  = {
    changeActiveFilter: (state:any, action:any) => {
        state.activeFilter = action.payload;
      },
      clearCompleted: (state:any) => {
        state.items = state.items.filter((item:any) => !item.completed);
      },
}