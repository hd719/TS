// useContext TS Tutorial

import React, { useCallback, useRef, useState, useContext } from "react";
import { TodosProvider, TodoContext } from "./useTodos";
import "./App.css";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    title?: string;
  }
> = ({ title, children, style, ...rest }) => (
  <button
    {...rest}
    style={{
      ...style,
      backgroundColor: "red",
      color: "white",
      fontSize: "xx-large",
    }}
  >
    {title ?? children}
  </button>
);

// Creating custom component with generics
function UL<T>({
  items,
  render,
  itemClick,
  children,
}: {
  items: T[];
  render: (item: T) => React.ReactNode; // In this generic component we are ADDING DETAILED HTML PROPS (gives us the ability to pass class names)
  itemClick: (item: T) => void;
} & React.PropsWithChildren<
  // ABILITY TO ADD CHILDREN
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  >
>) {
  return (
    <ul>
      {items.map((item, index) => (
        <li onClick={() => itemClick(item)} key={index}>
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

function App() {
  const initialState = [{ id: 0, text: "Hey there", done: false }];
  // const { todos, addTodo, removeTodo } = useTodos(initialState);
  const { todos, addTodo, removeTodo } = useContext(TodoContext);
  const newTodoRef = useRef<HTMLInputElement>(null);

  // Note: Trying input in another way
  const [todoValue, setTodoValue] = useState<string>("");

  // The onAddTodo function changes NEVER changes! Using the useCallback hook the reference to that function will stay the same even after the component has rendered and rerendered!!
  // Because the addTodo never changes the function onAddTodo will have referenced only once
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value);
      newTodoRef.current.value = "";
    }
    // if (todoValue) {
    //   console.log("todoValue:", todoValue);
    //   addTodo(todoValue);
    //   setTodoValue("");
    // }
  }, [addTodo]);

  return (
    <div>
      <Heading title="Introduction" />
      {/* <Box>Hello there</Box> */}

      <Heading title="Todos" />
      <UL
        itemClick={(item) => alert(item.id)}
        className=""
        items={todos}
        render={(todo) => (
          <>
            {todo.text}
            <button onClick={() => removeTodo(todo.id)}>Remove</button>
          </>
        )}
      />
      <div>
        <input type="text" ref={newTodoRef} />
        {/* <input
          type="text"
          value={todoValue}
          onChange={(e) => setTodoValue(e.target.value)}
        /> */}
        <Button onClick={onAddTodo}>Add Todo</Button>
      </div>
    </div>
  );
}

const AppWrapper = () => {
  return (
    <TodosProvider
      initialTodos={[{ id: 0, text: "Hey there use context", done: false }]}
    >
      <div style={{ display: "grid", gridTemplateColumns: "50%, 50%" }}>
        <App />
        <App />
      </div>
    </TodosProvider>
  );
};

export default AppWrapper;
