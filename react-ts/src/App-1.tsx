import React, {
  useCallback,
  useEffect,
  useState,
  useReducer,
  useRef,
} from "react";
import "./App.css";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Box = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: "1rem",
      fontWeight: "bold",
    }}
  >
    {children}
  </div>
);

const List: React.FunctionComponent<{
  items: string[];
  onClick?: (item: string) => void; // event handlers
}> = ({ items, onClick }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} onClick={() => onClick?.(item)}>
        {item}
      </li>
    ))}
  </ul>
);

interface Payload {
  text: string;
}

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

interface IntrinsicAttributes {
  setValue: () => void;
}
type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

// const Button: React.FunctionComponent<
//   React.DetailedHTMLProps<
//     React.ButtonHTMLAttributes<HTMLButtonElement>,
//     HTMLButtonElement
//   > & {
//     title?: string;
//   }
// > = ({ children, ...rest }: { children: React.ReactNode }) => {
//   <button {...rest}>{children}</button>;
// };

function App() {
  const onListClick = useCallback((item: string) => {
    alert(item);
  }, []);

  const [payload, setPayload] = useState<Payload | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((resp) => resp.json())
      .then((data) => {
        setPayload(data);
      });
  }, []);

  // Custom hook
  const useNumber = (initialValue: number) => useState<number>(initialValue);

  // These return types in an array
  type UseNumberValue = ReturnType<typeof useNumber>[0];
  type UseNumberSetValue = ReturnType<typeof useNumber>[1];

  const Incrementer: React.FunctionComponent<{
    value: UseNumberValue;
    setValue: UseNumberSetValue;
  }> = ({ value, setValue }) => (
    <button onClick={() => setValue(value + 1)}>Add</button>
  );

  // useReducer takes initial state and action type
  // Usually preferable to useState when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.
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
  }, []);

  const newTodoRef = useRef<HTMLInputElement>(null);

  // Custom hook
  const [value, setValue] = useNumber(0);

  // Wrapping handlers in useCallback keeps the reference the same
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({
        type: "ADD",
        text: newTodoRef.current.value,
      });
      newTodoRef.current.value = "";
    }
  }, []);

  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello there</Box>
      <List items={["one", "two", "three"]} onClick={onListClick} />
      <Box>{JSON.stringify(payload)}</Box>

      <Incrementer value={value} setValue={setValue} />
      <Heading title="Todos" />
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button
            onClick={() =>
              dispatch({
                type: "REMOVE",
                id: todo.id,
              })
            }
          >
            Remove
          </button>
        </div>
      ))}
      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>Add Todo</button>
      </div>
    </div>
  );
}

export default App;
