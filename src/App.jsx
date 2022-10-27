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
    const p = randomWords(wordCount).join(' ');
    console.log(p);
    if (useROT) {
      const r = rot13(p);
      setParagraph(r);
    } else {
      setParagraph(p);
    }
  }

  return (
    <Fragment>
      <div className="text-center">
        <h1 className="font-bold text-3xl mb-4">Random Paragraph</h1>
        <input
          id="word-count"
          type="number"
          onChange={e => setWordCount(e.target.valueAsNumber)}
          placeholder="Number of words..."
          className="border-stone-900 border-2 rounded-lg px-2 py-1"
        />
        <div className="text-base mt-3">
          <input id="rot_checkbox" type="checkbox" checked={useROT} onChange={e => setUseROT(!useROT)} />
          <label
            htmlFor="rot_checkbox"
            className="select-none"
          >Use ROT13 Encryption</label>
        </div>
        <button
          onClick={() => generate()}
          className="mt-2 px-4 py-2 bg-green-500 hover:bg-green-700 rounded-lg text-white font-bold"
        >
          Generate
        </button>
        <hr className="my-4" />
      </div>
      <div
        id="paragraph"
        className="px-5"
      >
        <p className="text-justify">
          {paragraph}
        </p>
      </div>
    </Fragment>
  );
}

export default App;
