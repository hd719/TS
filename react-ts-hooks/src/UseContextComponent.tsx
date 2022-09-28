import React, { useState, useContext, createContext } from "react";

const initialState = {
  first: "H",
  last: "D",
};

type UserState = typeof initialState;

const UserContext = createContext<typeof initialState>(initialState);

export default function UseContextComponent() {
  const [user, setUser] = useState<UserState>({ first: "H", last: "D" });

  return (
    <UserContext.Provider value={user}>
      <ContextConsumerComponent />
    </UserContext.Provider>
  );
}

export function ContextConsumerComponent() {
  const userContext = useContext(UserContext);

  return (
    <>
      <div>{userContext.first}</div>
      <div>{userContext.last}</div>
    </>
  );
}
