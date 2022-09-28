import React, { useState } from "react";

export default function UseStateComponent() {
  // Have explicitly state that the state is an array of numbers
  const [arr, setArr] = useState<number[]>([]);
  // In case you have a null value
  const [name, setName] = useState<string | null>(null);

  return (
    <div>
      <div>
        <button onClick={() => setArr([...arr, arr.length + 1])}>
          Add to array
        </button>
        {JSON.stringify(arr)}
        <button onClick={() => setName("H")}>Set Name</button>
        {JSON.stringify(name)}
      </div>
    </div>
  );
}
