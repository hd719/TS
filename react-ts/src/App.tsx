import React, { useCallback } from "react";
import "./App.css";

const Heading = ({ title }: { title: string }) => {
  return <h1>{title}</h1>;
};

// handling children
const Box = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const List: React.FunctionComponent<{
  items: string[];
  onClick?: (item: string) => void; // event handlers
}> = ({ items, onClick }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index + 1} onClick={() => onClick?.(item)}>
          {item}
        </li>
      ))}
    </ul>
  );
};

function App() {
  const handleClick = useCallback((item: string) => {
    console.log(item);
  }, []);

  return (
    <div>
      <Heading title="Intro" />
      <Box>Hello there</Box>
      <List items={["one", "two", "three"]} onClick={handleClick} />
    </div>
  );
}

export default App;
