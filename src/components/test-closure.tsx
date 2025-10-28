import React, { useEffect, useState } from "react";

// react hook 与 闭包，hook 与 闭包经典的坑
export const Test = () => {
  const [num, setNum] = useState(0);

  const add = () => setNum(num + 1);

  useEffect(() => {
    const id = setInterval(() => {
      console.log("num in setInterval:", num);
    }, 1000);
    return () => clearInterval(id);
  }, [num]);

  useEffect(() => {
    return () => {
      console.log("卸载值：", num);
    };
  }, [num]);

  return (
    <div>
      <button onClick={add}>add</button>
      <p>number: {num}</p>
    </div>
  );
};
