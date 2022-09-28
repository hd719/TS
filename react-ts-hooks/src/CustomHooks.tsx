import React, { useState, useEffect } from "react";

// This component is very specific to user data!!
// interface UserData {
//   id: string;
//   name: string;
// }

// function useFetchData(url: string): { data: UserData[] | null; done: boolean } {
//   const [data, setData] = useState<UserData[] | null>(null);
//   const [done, setDone] = useState(false);

//   useEffect(() => {
//     fetch(url)
//       .then((response) => response.json())
//       .then((data: UserData[]) => {
//         setData(data);
//         setDone(true);
//       });
//   }, [url]);

//   return { data, done };
// }

// export default function CustomHooks() {
//   const { data, done } = useFetchData("./data.json");

//   return done ? (
//     <>
//       {data?.map((user) => (
//         <>
//           <div>{user.id}</div>
//           <div>{user.name}</div>
//         </>
//       ))}
//     </>
//   ) : (
//     <div>Fetching Users...</div>
//   );
// }

// Replace UserData[] with a generic (you can have CommentData[] or PostData[])

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

  return done ? (
    <>
      {data?.map((user) => (
        <>
          <div>{user.id}</div>
          <div>{user.name}</div>
        </>
      ))}
    </>
  ) : (
    <div>Fetching Users...</div>
  );
}
