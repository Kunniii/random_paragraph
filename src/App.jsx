import { Fragment, useState } from "react";
import * as randomWords from "random-words";

function App() {
  const [wordCount, setWordCount] = useState(0);
  const [paragraph, setParagraph] = useState("");
  const [useROT, setUseROT] = useState(false);
  const [sentenceCount, setSentenceCount] = useState(0);
  const [copyStatus, setCopyStatus] = useState(2);

  const rot13 = (message) => {
    return message.replace(/[a-z]/gi, (letter) =>
      String.fromCharCode(letter.charCodeAt(0) + (letter.toLowerCase() <= "m" ? 13 : -13))
    );
  };

  const wordsPerSentence = (wordsNum, numSentences) => {
    const sentenceLengths = [];

    if (numSentences <= 0) {
      return sentenceLengths;
    }

    const wordsPerSentence = Math.floor(wordsNum / numSentences);
    let remainingWords = wordsNum - wordsPerSentence * numSentences;

    for (let i = 0; i < numSentences; ++i) {
      sentenceLengths.push(wordsPerSentence);
    }

    for (let i = 0; i < numSentences; ++i) {
      sentenceLengths[i] += 1;
      remainingWords -= 1;
      if (remainingWords == 0) {
        break;
      }
    }
    return sentenceLengths;
  };

  const generateSentences = (wordsPerSentence) => {
    let sentences = [];
    for (let len of wordsPerSentence) {
      let temp = randomWords.generate({ exactly: len, join: " " });
      let sentence = temp[0].toUpperCase() + temp.slice(1) + ".";
      sentences.push(sentence);
    }
    return sentences;
  };

  const postProcess = () => {
    let finalString;

    if (!sentenceCount) {
      finalString = randomWords.generate(wordCount).join(" ") + ".";
      finalString = finalString[0].toUpperCase() + finalString.slice(1);
    } else {
      if (wordCount < sentenceCount - 2) {
        alert("Cannot create paragraph!");
      } else {
        let wps = wordsPerSentence(wordCount, sentenceCount);
        let sentences = generateSentences(wps);
        finalString = sentences.join(" ");
      }
    }

    if (useROT) {
      finalString = rot13(finalString);
    }

    return finalString;
  };

  const generate = async () => {
    if (!wordCount) return;
    const result = postProcess();
    setParagraph(result);
  };

  const copyToClipboard = () => {
    if (paragraph === "") return;
    let target = document.getElementById("paragraph");
    navigator.clipboard
      .writeText(target.innerText)
      .then(() => {
        setCopyStatus(1);
        setTimeout(() => {
          setCopyStatus(2);
        }, 3000);
      })
      .catch(() => {
        setCopyStatus(0);
        setTimeout(() => {
          setCopyStatus(2);
        }, 3000);
      });
  };

  const saveToFile = () => {
    if (paragraph === "") return;
    window.open("data:application/txt," + encodeURIComponent(paragraph), "_self");
  };

  return (
    <Fragment>
      <div className="duration-200 text-center rounded-xl border mt-2 mx-2 bg-white py-5 drop-shadow-lg">
        <h1 className="font-bold text-3xl mb-4 select-none">Random Paragraph</h1>
        <div className="flex justify-center">
          <input
            id="word-count"
            type="number"
            onChange={(e) => setWordCount(e.target.valueAsNumber)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                generate();
              }
            }}
            placeholder="Words..."
            className="w-32 outline-none border-2 border-dashed mx-3 focus:border-solid focus:scale-110 hover:border-solid hover:scale-110 duration-200 rounded-lg px-2 py-1 select-none"
          />
          <input
            type="number"
            onChange={(e) => setSentenceCount(e.target.valueAsNumber)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                generate();
              }
            }}
            placeholder="Sentences..."
            className="w-32 outline-none border-2 border-dashed mx-3 focus:border-solid focus:scale-110 hover:border-solid hover:scale-110 duration-200 rounded-lg px-2 py-1 select-none"
          />
        </div>
        <div className="text-base mt-3">
          <input
            id="rot_checkbox"
            type="checkbox"
            checked={useROT}
            onChange={() => setUseROT(!useROT)}
          />
          <label
            htmlFor="rot_checkbox"
            className="select-none mb-3 pl-2"
          >
            Use ROT13 Encryption
          </label>
        </div>
        <button
          onClick={generate}
          className="mx-2 mt-2 px-4 py-2 bg-lime-500 hover:scale-110 duration-150 rounded-xl text-white font-bold select-none"
        >
          Generate
        </button>
        <button
          onClick={saveToFile}
          className="mx-2 mt-2 px-4 py-2 bg-cyan-500 hover:scale-110 duration-150 rounded-xl text-white font-bold select-none"
        >
          Save
        </button>
        <button
          onClick={copyToClipboard}
          className="mx-2 mt-2 px-4 py-2 bg-amber-500 hover:scale-110 duration-150 rounded-xl text-white font-bold select-none"
        >
          Copy
        </button>
        <button
          onClick={() => setParagraph("")}
          className="mx-2 mt-2 px-4 py-2 bg-rose-500 hover:scale-110 duration-150 rounded-xl text-white font-bold select-none"
        >
          Clear
        </button>
        {copyStatus == 2 ? (
          <p className="duration-100"></p>
        ) : copyStatus ? (
          <p
            id="copied-ok"
            className="duration-100 text-center text-green-500 font-bold mt-4"
          >
            copied
          </p>
        ) : (
          <p
            id="copied-error"
            className="duration-100 text-center text-red-500 font-bold mt-4"
          >
            error
          </p>
        )}
      </div>
      {paragraph ? (
        <div className="p-3 mx-2 my-2 rounded-xl border bg-white drop-shadow-lg duration-200 flex justify-center">
          <p
            className="text-justify"
            id="paragraph"
          >
            {paragraph}
          </p>
        </div>
      ) : (
        <div className="duration-200"></div>
      )}
    </Fragment>
  );
}

export default App;
