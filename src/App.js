import React, { useEffect, useState } from "react";
import "./App.css";
import searchContent from "./api";

function App() {
  const [ranNumArr, setRanNumArr] = useState([]);
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");

  const today = new Date();
  const dateFormat = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const ranNums = () => {
    let numArr = [];
    while (numArr.length < 3) {
      let n = Math.floor(Math.random() * 10);
      if (numArr.indexOf(n) === -1) numArr.push(n);
    }
    console.log(numArr);
    return numArr;
  };

  const removePipe = (line) => {
    const newLine = line.replace(" |", ",");
    return newLine;
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const handleSubmit = async () => {
    const result = await searchContent("", dateFormat(today));
    console.log(result);
    let ranNumArr = ranNums();
    handleLine1(result[ranNumArr[0]].webTitle);
    handleLine2(result[ranNumArr[1]].webTitle);
    handleLine3(result[ranNumArr[2]].webTitle);
  };
  const handleLine1 = (headline) => {
    headline.includes(" – ")
      ? setLine1(headline.slice(0, headline.indexOf(" – ")))
      : headline.includes("|")
      ? setLine1(headline.slice(0, headline.indexOf(" |")))
      : headline.includes(":")
      ? setLine1(headline.slice(0, headline.indexOf(":")))
      : headline.includes(".")
      ? setLine1(headline.slice(0, headline.indexOf(".")))
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
    setLine2(removePipe(str.charAt(0).toUpperCase() + str.slice(1)));
  };

  const handleLine3 = (headline) => {
    const headlineArr = headline.split(" ");
    const lastPart = headlineArr
      .slice(headlineArr.length - 4, headlineArr.length)
      .join(" ");
    let shortened;
    headline.includes(" – ")
      ? (shortened = headline.slice(0, headline.indexOf(" – ")))
      : headline.includes(":")
      ? (shortened = headline.slice(0, headline.indexOf(":")))
      : headline.includes(",")
      ? (shortened = headline.slice(0, headline.indexOf(",")))
      : headline.includes(";")
      ? (shortened = headline.slice(0, headline.indexOf(";")))
      : (shortened = lastPart);
    setLine3(removePipe(shortened));
  };

  return (
    <>
      <div className="center flex-container">
        <div className="flex-container-col">
          <div>Today is {dateFormat(today)}</div>
          <div className="flex-container-col margin-3 font-l">
            <div className="padding-1">{line1},</div>
            <div className="padding-1">{line2},</div>
            <div className="padding-1">{line3}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
