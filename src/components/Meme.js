import { useState } from "react";
import Draggable from "react-draggable";
import * as htmlToImage from 'html-to-image';

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


  const downloadImage = async () => {
    const dataUrl = await htmlToImage.toPng(document.getElementById("meme"));
   
    // download image
    const link = document.createElement('a');
    link.download = "html-to-img.png";
    link.href = dataUrl;
    link.click();
  }

  return (
    <main>
      <div className="container">
        <div className="meme-container" id="canvas">
          <div className="form">
            <div className="input-group">
              <input
                type="text"
                placeholder="Texto superior"
                className="form--input"
                name="topText"
                value={meme.topText}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Texto inferior"
                className="form--input"
                name="bottomText"
                value={meme.bottomText}
                onChange={handleChange}
              />
            </div>
            <button className="form--button" onClick={fetchMemesImages}>
              Gerar nova imagem!!
            </button>
            <button  className="form--button" onClick={downloadImage}>
                Exportar como imagem
            </button>





          </div>
          <div className="meme-output">
            <div className="image-container" id='meme'>
              <img src={meme.randomImage} alt="meme" className="meme-img" />
              <Draggable className="draggable" bounds=".image-container">
                <h2 className="meme--text top">{meme.topText}</h2>
              </Draggable>
              <Draggable className="draggable" bounds=".image-container">
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
              </Draggable>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Meme;
