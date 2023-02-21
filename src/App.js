import React, { useEffect, useState } from "react";
import "./App.css";
import searchContent from "./api";

function App() {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");
  const [url1, setUrl1] = useState("");
  const [url2, setUrl2] = useState("");
  const [url3, setUrl3] = useState("");
  const [linksOpen, setLinksOpen] = useState(false);

  const today = new Date();
  const dateFormat = (date) => {
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  const ranNums = () => {
    let numArr = [];
    while (numArr.length < 3) {
      let n = Math.floor(Math.random() * 10);
      if (numArr.indexOf(n) === -1) numArr.push(n);
    }
    console.log(numArr);
    return numArr;
  };

  /// formatting functions /////////

  const upToPunctuation = (headline) => {
    let newHeadline = headline;
    newHeadline.includes(" – ") &&
      (newHeadline = headline.slice(0, headline.indexOf(" – ")));
    newHeadline.includes("|") &&
      (newHeadline = headline.slice(0, headline.indexOf(" |")));
    newHeadline.includes(":") &&
      (newHeadline = headline.slice(0, headline.indexOf(":")));
    newHeadline.includes(".") &&
      (newHeadline = headline.slice(0, headline.indexOf(".")));
    newHeadline.includes(",") &&
      (newHeadline = headline.slice(0, headline.indexOf(",")));
    newHeadline.includes(";") &&
      (newHeadline = headline.slice(0, headline.indexOf(";")));
    return newHeadline;
  };

  const checkForTooManyWords = (line) => {
    const headlineArr = line.split(" ");
    if (headlineArr.length > 9) {
      const firstSix = headlineArr.slice(0, 6);
      return firstSix.join(" ");
    } else {
      return line;
    }
  };

  const removePipe = (line) => {
    const newLine = line.replace(" |", ",");
    return newLine;
  };

  ///////////////////////////////////

  const handleSubmit = async () => {
    const result = await searchContent("", dateFormat(today));
    console.log(result);
    let ranNumArr = ranNums();
    handleLine1(result[ranNumArr[0]]);
    handleLine2(result[ranNumArr[1]]);
    handleLine3(result[ranNumArr[2]]);
  };

  const handleLine1 = (result) => {
    setUrl1(result.webUrl);
    const headline = result.webTitle;
    const shortenedHeadline = upToPunctuation(headline);
    headline === shortenedHeadline
      ? setLine1(headline.slice(0, headline.indexOf(" ")))
      : setLine1(checkForTooManyWords(shortenedHeadline));
  };

  const handleLine2 = (result) => {
    setUrl2(result.webUrl);
    const headlineArr = result.webTitle.split(" ");
    const lastFour = headlineArr.slice(
      headlineArr.length - 4,
      headlineArr.length
    );
    const str = lastFour.join(" ");
    setLine2(removePipe(str.charAt(0).toUpperCase() + str.slice(1)));
  };

  const handleLine3 = (result) => {
    setUrl3(result.webUrl);
    const headline = result.webTitle;
    const headlineArr = headline.split(" ");
    const lastPart = headlineArr
      .slice(headlineArr.length - 4, headlineArr.length)
      .join(" ");
    const shortenedHeadline = upToPunctuation(headline);
    headline === shortenedHeadline
      ? setLine3(lastPart)
      : setLine3(checkForTooManyWords(shortenedHeadline));
  };

  return (
    <>
      <div className="flex-container-col">
        <div style={{ margin: "1rem" }}>Today is {dateFormat(today)}</div>
        <div className="flex-container-col margin-5pc font-l typing">
          <div className="padding-v">{line1},</div>
          <div className="padding-v ">{line2},</div>
          <div className="padding-v ">{line3}.</div>
        </div>
        <div className="margin-5pc" style={{ marginTop: 0 }}>
          <div
            className="references"
            onClick={() => {
              setLinksOpen(!linksOpen);
            }}
          >
            view references
          </div>
          {linksOpen && (
            <div style={{ margin: "0rem 3rem" }}>
              <p>
                <a
                  href={url1}
                  target="_blank"
                  rel="noreferrer"
                  title="Go to article"
                >
                  {url1}
                </a>
              </p>
              <p>
                <a
                  href={url2}
                  target="_blank"
                  rel="noreferrer"
                  title="Go to article"
                >
                  {url2}
                </a>
              </p>
              <p>
                <a
                  href={url3}
                  target="_blank"
                  rel="noreferrer"
                  title="Go to article"
                >
                  {url3}
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
