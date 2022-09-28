// Props

import React from "react";

// Export props
interface HeadingProps {
  title: string;
}

function Heading({ title }: HeadingProps) {
  return (
    <div>
      <div>{title}</div>
      {/* <ReturnTheArg value={1} /> */}
    </div>
  );
}

// const ReturnTheArg = ({ value }: { value: number }) => {
//   return <div>{value}</div>;
// };

// function List<ListItem>({
//   items,
//   render,
// }: {
//   items: ListItem[];
//   render: (item: ListItem) => React.ReactNode;
// }) {
// return (
//   <ul>
//     {items.map((item, index) => (
//       <li key={index}>{render(item)}</li>
//     ))}
//   </ul>
// );
// }

// As arrow function
export const List: <ListItem>({
  items,
  render,
}: {
  items: ListItem[];
  render: (item: ListItem) => React.ReactNode;
}) => React.ReactNode = ({ items, render }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{render(item)}</li>
      ))}
    </ul>
  );
};

export default function TestComponent() {
  return <Heading title="hello" />;
}
