import { useState } from "react";

const Meme = () => {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  };
  //Nós "abrimos" a event.target e pegamos os valores que precisamos para poder fazer com que
  //a função handleChange seja o mais generica possivel para a nossa aplicação.

  const fetchMemesImages = async () => {
    const response = await fetch("https://api.imgflip.com/get_memes");
    const { data } = await response.json();
    const { memes } = data;
    const randomMeme = Math.floor(Math.random() * memes.length);
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: memes[randomMeme].url,
    }));
  };

  return (
    <main>
        <div className="container">
            <div className="meme-container">
                <div className="form">
                    <div className="input-group">
                        <input
                        type="text"
                        placeholder="Top text"
                        className="form--input"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                        />
                        <input
                        type="text"
                        placeholder="Bottom text"
                        className="form--input"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                        />
                    </div>
                    <button className="form--button" onClick={fetchMemesImages}>
                    Get a new image!
                    </button>
                </div>
                <div className="meme-output">
                    <img className="meme-img"  src={meme.randomImage} alt="meme"></img>
                    <h2 className="meme--text top">{meme.topText}</h2>
                    <h2 className="meme--text bottom">{meme.bottomText}</h2>
                </div>
            </div>
        
        </div>
    </main>
  );
};

export default Meme;
