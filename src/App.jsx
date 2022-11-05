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

  const copyToClipboard = () => {
    if (paragraph === '') return;
    alert("Data copied!!");
    navigator.clipboard.writeText(paragraph);
  }

  const saveToFile = () => {
    if (paragraph === '') return;
    window.open("data:application/txt," + encodeURIComponent(paragraph), "_self");
  }

  return (
    <Fragment>
      <div className="text-center">
        <h1 className="font-bold text-3xl mb-4">Random Paragraph</h1>
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
          className="border-stone-900 border-2 rounded-lg px-2 py-1"
        />
        <div className="text-base mt-3">
          <input id="rot_checkbox" type="checkbox" checked={useROT} onChange={e => setUseROT(!useROT)} />
          <label
            htmlFor="rot_checkbox"
            className="select-none mb-3"
          >Use ROT13 Encryption</label>
        </div>
        <button
          onClick={() => generate()}
          className="mx-5 mt-2 px-4 py-2 bg-green-500 hover:bg-green-700 rounded-lg text-white font-bold"
        >
          Generate
        </button>
        <button
          onClick={() => saveToFile()}
          className="mx-5 mt-2 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg text-white font-bold"
        >
          Save
        </button>
        <button
          onClick={() => copyToClipboard()}
          className="mx-5 mt-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-700 rounded-lg text-white font-bold"
        >
          Copy
        </button>
        <hr className="my-4" />
      </div>
      <div
        className="px-5" id="paragraph"
      >
        <p className="text-justify">
          {paragraph}
        </p>
      </div>
    </Fragment>
  );
}

export default App;
