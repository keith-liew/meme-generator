import React, { useState, useEffect } from "react";

function Meme() {
  const [meme, setMeme] = useState({
    randomImage: "",
    topText: "",
    bottomText: ""
  });

  const [memes, setMemes] = useState([]);

  function getMemeImage() {
    setMeme((prev) => ({
      ...prev,
      randomImage: memes[Math.floor(Math.random() * 100)].url
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prev) => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    async function getMeme() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json();
      setMemes(data.data.memes);
    }
    getMeme();
  }, []);

  return (
    <div className="main">
      <div className="form">
        <input
          className="input top-text"
          type="text"
          placeholder="Top Text"
          name="topText"
          onChange={handleChange}
          value={meme.topText}
        />
        <input
          className="input bottom-text"
          type="text"
          placeholder="Bottom Text"
          name="bottomText"
          onChange={handleChange}
          value={meme.bottomText}
        />
        <button className="button" onClick={getMemeImage}>
          Get a new meme image
        </button>
      </div>
      <div className="meme">
        <p className="meme-text meme-top-text">{meme.topText}</p>
        <p className="meme-text meme-bottom-text">{meme.bottomText}</p>
        {meme.randomImage !== "" && (
          <img className="meme-picture" alt="meme" src={meme.randomImage} />
        )}
      </div>
    </div>
  );
}

export default Meme;
