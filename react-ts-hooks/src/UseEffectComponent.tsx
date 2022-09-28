import React, { useState, useEffect } from "react";

export default function UseEffectComponent() {
  const [val, valSet] = useState(1);

  useEffect(() => {
    const interval = window.setInterval(() => {
      valSet((v) => v + 1);
    }, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return <div>{val}</div>;
}
