import React, { useReducer } from "react";

export default function UseReducerComponent() {
  const initialState = {
    counter: 100,
  };

  type ACTIONTYPES =
    | { type: "increment"; payload: number }
    | { type: "decrement"; payload: number };

  function counterReducer(state: typeof initialState, action: ACTIONTYPES) {
    switch (action.type) {
      case "increment":
        return { ...state, counter: state.counter + action.payload };
      case "decrement":
        return { ...state, counter: state.counter - action.payload };
      default:
        throw new Error();
    }
  }

  // useReducer takes a reducer function and an initial state (2 args)
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <div>{state.counter}</div>
      <button onClick={() => dispatch({ type: "increment", payload: 1 })}>
        increment
      </button>

      <button onClick={() => dispatch({ type: "decrement", payload: 1 })}>
        decrement
      </button>
    </div>
  );
}
