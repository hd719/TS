import React, { useRef, useState } from "react";

export default function UseRefComponent() {
  // const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <>
      <input
        type="text"
        // Controlled vs using useRef uncontrolled
        // onChange={(e) => setInputValue(e.target.value)}
        ref={inputRef}
      />
    </>
  );
}
