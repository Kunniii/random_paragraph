import { Fragment, useState } from "react";
import randomWords from 'random-words';

function App() {
  const [wordCount, setWordCount] = useState(0);
  const [paragraph, setParagraph] = useState('');
  const [useROT, setUseROT] = useState(false);

  const rot13 = (message) => {
    return message.replace(/[a-z]/gi, letter => String.fromCharCode(letter.charCodeAt(0) + (letter.toLowerCase() <= 'm' ? 13 : -13)));
  }

  const generate = async () => {
    if (!wordCount) return;
    const p = randomWords(wordCount).join(' ');
    if (useROT) {
      const r = rot13(p);
      setParagraph(r);
    } else {
      setParagraph(p);
    }
  }

  function copyToClipboard() {
    if (paragraph === '') return;
    let target = document.getElementById("paragraph");
    navigator.clipboard.writeText(target.innerText).then(() => {
      document.getElementById("copied-ok").innerText = "Section copied!"
      document.getElementById("copied-ok").style.display = "block";
      setTimeout(() => {
      document.getElementById("copied-ok").innerText = ""
      document.getElementById("copied-ok").style.display = "none";
      }, 3000);
    }).catch(() => {
      document.getElementById("copied-error").innerText = "Error when copy"
      document.getElementById("copied-error").style.display = "block";
      setTimeout(() => {
      document.getElementById("copied-error").innerText = ""
      document.getElementById("copied-error").style.display = "none";
      }, 3000);
    })

    if (1) {
      
    }
  }

  const saveToFile = () => {
    if (paragraph === '') return;
    window.open("data:application/txt," + encodeURIComponent(paragraph), "_self");
  }

  return (
    <Fragment>
      <div className="text-center">
        <h1 className="font-bold text-3xl mb-4 select-none">Random Paragraph</h1>
        <input
          id="word-count"
          type="number"
          onChange={e => setWordCount(e.target.valueAsNumber)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              generate();
            }
          }}
          placeholder="Number of words..."
          className="border-stone-900 border-2 rounded-lg px-2 py-1 select-none"
        />
        <div className="text-base mt-3">
          <input id="rot_checkbox" type="checkbox" checked={useROT} onChange={e => setUseROT(!useROT)} />
          <label
            htmlFor="rot_checkbox"
            className="select-none mb-3 select-none"
          >Use ROT13 Encryption</label>
        </div>
        <button
          onClick={generate}
          className="mx-5 mt-2 px-4 py-2 bg-green-500 hover:bg-green-700 rounded-lg text-white font-bold select-none"
        >
          Generate
        </button>
        <button
          onClick={saveToFile}
          className="mx-5 mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg text-white font-bold select-none"
        >
          Save
        </button>
        <button
          onClick={copyToClipboard}
          className="mx-5 mt-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-700 rounded-lg text-white font-bold select-none"
        >
          Copy
        </button>
        <h1 id="copied-ok" className="text-center text-green-500 font-bold mt-4" style={{display: "none"}}>
        </h1>
        <h1 id="copied-error" className="text-center text-red-500 font-bold mt-4" style={{display: "none"}}>
        </h1>
        <hr className="my-4" />
      </div>
      <div
        className="px-5"
      >
        <p className="text-justify" id="paragraph">
          {paragraph}
        </p>
      </div>
    </Fragment>
  );
}

export default App;
