import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

interface TodoSlicesState {
  todos: Todo[];
}

const initialState: TodoSlicesState = {
  todos: [],
};

// This createslice function automatically generates action creators
export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos = [
        ...state.todos,
        {
          id: state.todos.length,
          text: action.payload,
          done: false,
        },
      ];

      return state;
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(({ id }) => id !== action.payload);
      return state;
    },
  },
});

// action creates are generated automatically
export const { addTodo, removeTodo } = todosSlice.actions;

// In the reducer you can basically divide each part (into slices), so you can have a user slice (contains data about users) or home page slice (contains data on the home page)
export const store = configureStore({
  reducer: {
    // Automatically creates the reducer object for you
    todos: todosSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;

export const selectTodos = (state: RootState) => state.todos.todos;

export default store;
