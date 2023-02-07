import React, { useState } from "react";
import "./App.css";
import searchContent from "./api";

function App() {
  const [headline1, setHeadline1] = useState([]);
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");

  const today = new Date();
  const dateFormat = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const handleSubmit = async () => {
    const result = await searchContent("", dateFormat(today));
    console.log(result);
    const ranNum = Math.floor(Math.random() * 10);
    const ranNum2 = Math.floor(Math.random() * 10);
    handleLine1(result[ranNum].webTitle);
    handleLine2(result[ranNum2].webTitle);
  };
  const handleLine1 = (headline) => {
    headline.includes(" – ")
      ? setLine1(headline.slice(0, headline.indexOf(" – ")))
      : headline.includes(":")
      ? setLine1(headline.slice(0, headline.indexOf(":")))
      : headline.includes(",")
      ? setLine1(headline.slice(0, headline.indexOf(",")))
      : setLine1(headline.slice(0, headline.indexOf(" ")));
  };
  const handleLine2 = (headline) => {
    const headlineArr = headline.split(" ");
    const lastFour = headlineArr.slice(
      headlineArr.length - 4,
      headlineArr.length
    );
    const str = lastFour.join(" ");
    setLine2(str.charAt(0).toUpperCase() + str.slice(1));
  };

  return (
    <>
      <button onClick={handleSubmit}>Button</button>
      <div>Today's date: {dateFormat(today)}</div>
      <div>{line1},</div>
      <div>{line2},</div>
      <div>{line3}</div>
    </>
  );
}

export default App;
