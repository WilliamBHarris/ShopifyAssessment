import { useState } from "react";
import "./App.css";
const { Configuration, OpenAIApi } = require("openai");


const dataArray = [];

function App() {
  const [data, setData] = useState();
  const [inputData, setInputData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const configuration = new Configuration({
      apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

    await openai
      .createCompletion("text-curie-001", {
        prompt: `Write a detailed, smart, informative, and professional product description for ${inputData}`,
        temperature: 0.98,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((response) => {
        setData(response.data);
        dataArray.push({ text: response.data.choices[0].text, prompt: inputData })
      })
      .catch((error) => error)
      setInputData('')
  };

  const handleChange = (e) => {
    setInputData(e.target.value);
  };

  return (
    <div className="App">
      <h1>Product description generator</h1>
      <form onSubmit={handleSubmit}>
        <h3>Enter A Product Name</h3>
        <input
          required
          value={inputData}
          placeholder="Tell the AI a product to describe..."
          type="text"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">Submit</button>
      </form>
      <h3>Results</h3>
      {dataArray.length !== 0 ? 
      <div>
        {[...dataArray].reverse().map((text, i) => ( 
          <div key={i} className="responseBox">
            <p key={i + .01}><b>Prompt:</b> {text.prompt}</p>
            <p key={i + .1}><b>Response:<br/></b> {text.text}</p>
          </div>
        ))}
      </div> : <p className="noSearch">...awaiting a submission...</p>}
    </div>
  );
}

export default App;
