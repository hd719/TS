import React, { useCallback, useReducer, createContext } from "react";

type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type UseTodosManagerResult = ReturnType<typeof useTodosManger>;

export const TodoContext = createContext<UseTodosManagerResult>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
});

export function useTodosManger(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} {
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length,
            text: action.text,
            done: false,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
      default:
        throw new Error();
    }
  }, initialTodos);

  // We wrap this in a useCallback hook because the addTodo is an action and these functions do not change usually or at all
  // Create a function and export it so it holds the same reference to the callback (useCallback)
  const addTodo = useCallback((text: string) => {
    dispatch({
      type: "ADD",
      text,
    });
  }, []);

  const removeTodo = useCallback((id: number) => {
    dispatch({ type: "REMOVE", id });
  }, []);

  return { todos, addTodo, removeTodo };
}

interface TodosProviderProps {
  initialTodos: Todo[];
  children?: React.ReactNode;
}

export const TodosProvider: React.FunctionComponent<TodosProviderProps> = ({
  initialTodos,
  children,
}) => {
  return (
    <TodoContext.Provider value={useTodosManger(initialTodos)}>
      {children}
    </TodoContext.Provider>
  );
};
