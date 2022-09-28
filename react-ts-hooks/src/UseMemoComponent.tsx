import React, { useState, useEffect, useMemo } from "react";

interface UserData {
  id: string;
  name: string;
}

function useFetchData<Payload>(url: string): {
  data: Payload | null;
  done: boolean;
} {
  const [data, setData] = useState<Payload | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data: Payload) => {
        setData(data);
        setDone(true);
      });
  }, [url]);

  return { data, done };
}

export default function CustomHooks() {
  const { data, done } = useFetchData<UserData[]>("./data.json");
  const newData = useMemo(() => {
    return data;
  }, [data]);

  return done ? (
    <>
      {data?.map((user) => (
        <>
          <div>{user.id}</div>
          <div>{user.name}</div>

          <div>{JSON.stringify(newData)}</div>
        </>
      ))}
    </>
  ) : (
    <div>Fetching Users...</div>
  );
}
