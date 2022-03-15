
interface TodosInitialState {
    items: [
        
    ];
    isLoading: boolean;
    activeFilter: "all" | "completed" | "active";
    error: string | null;
    addNewTodoLoading: boolean;
    addNewTodoError: null;
    addNewTodo: {
        isLoading : boolean;
        error : boolean;
    }
}


export const todosInitialState = {
    items: [  ],
    activeFilter: "all",
    isLoading : false,
    error: null as string | null,
    addNewTodoLoading: false,
    addNewTodoError: null,
    addNewTodo : {
        isLoading : false,
        error: false
    }
}as TodosInitialState;