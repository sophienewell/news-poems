import React, { useState } from "react";
import "./App.css";
import searchContent from "./api";

function App() {
  const [headline1, setHeadline1] = useState([]);
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");

  const today = new Date();
  const dateFormat = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const handleSubmit = async (term) => {
    const result = await searchContent("", dateFormat(today));
    const ranNum = Math.floor(Math.random() * 10);
    setHeadline1(result[ranNum].webTitle);
    console.log(result, ranNum);
  };
  const handleShorten = () => {
    headline1.includes(":")
      ? //const colon = headline1.indexOf(":");
        setLine1(headline1.slice(0, headline1.indexOf(":")))
      : headline1.includes(",")
      ? setLine1(headline1.slice(0, headline1.indexOf(",")))
      : setLine1(headline1);
  };

  return (
    <>
      <button onClick={handleSubmit}>Button</button>
      <div>{headline1}</div>
      <button onClick={handleShorten}>Shortened</button>
      <div>Line 1: {line1},</div>
      <div>Line 2: {line2}</div>
      <div>{dateFormat(today)}</div>
    </>
  );
}

export default App;
