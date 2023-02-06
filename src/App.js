import React, { useState } from "react";
import "./App.css";
import searchContent from "./api";

function App() {
  const [headline1, setHeadline1] = useState([]);
  const [line1, setLine1] = useState("");

  const handleSubmit = async (term) => {
    const result = await searchContent("castle");
    setHeadline1(result[0].webTitle);
    console.log(result);
  };
  const handleShorten = () => {
    const period = headline1.indexOf(":");
    setLine1(headline1.slice(0, period));
  };

  return (
    <>
      <button onClick={handleSubmit}>Button</button>
      <div>{headline1}</div>
      <button onClick={handleShorten}>Shortened</button>
      <div>{line1}</div>
    </>
  );
}

export default App;
