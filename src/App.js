import "./App.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import images from "./images/noimage1.jpeg";
import Header from "./Header";
function App() {
  const [german, setGerman] = useState(false);
  const [news, setNews] = useState([]);
  const [relevant, setRelevant] = useState(true);
  const [popular, setPopular] = useState(false);
  const [input, setInput] = useState("Art");

  const relevantStyles = {
    backgroundColor: relevant ? "#006d28" : "#00ff5e",
  };
  const popularStyles = {
    backgroundColor: popular ? "#006d28" : "#00ff5e",
  };
  useEffect(() => {
    if (input === "") {
      setInput("World");
    }
  }, []);

  useEffect(() => {
    let url;

    if (german && !popular) {
      url = `https://newsapi.org/v2/everything?q=${input}&language=de&pageSize=50&apiKey=a4977f1df34f4d4ebe79b5773bf0bcbe`;
    }
    if (german && popular) {
      url = `https://newsapi.org/v2/everything?q=${input}a&sortBy=popularity&language=de&pageSize=50&apiKey=a4977f1df34f4d4ebe79b5773bf0bcbe`;
    }
    if (!german && popular) {
      url = `https://newsapi.org/v2/everything?q=${input}&sortBy=popularity&pageSize=50&apiKey=a4977f1df34f4d4ebe79b5773bf0bcbe`;
    }
    if (!german && !popular) {
      url = `https://newsapi.org/v2/everything?q=${input}&pageSize=50&apiKey=a4977f1df34f4d4ebe79b5773bf0bcbe`;
    }
    if (!input) {
      url =
        "https://newsapi.org/v2/everything?q=world&pageSize=50&apiKey=a4977f1df34f4d4ebe79b5773bf0bcbe";
    }
    fetch(url)
      .then((res) => res.json())
      .then((data) => setNews(data.articles));
  }, [german, popular, input]);

  const handlePopular = () => {
    setPopular(!popular);
  };
  const handleRelevant = () => {
    setRelevant(!relevant);
  };
  const handleChange = () => {
    handlePopular();
    handleRelevant();
  };
  return (
    <div className="App">
      <Header german={german} setGerman={setGerman} />
      <article className="top">
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          className="input"
          placeholder="  Search"
        />
        <div className="container-filter">
          <button
            style={popularStyles}
            className="filter"
            onClick={() => {
              handleChange();
            }}
          >
            Popular
          </button>
          <button
            style={relevantStyles}
            className="filter"
            onClick={() => {
              handleChange();
            }}
          >
            Relevant
          </button>
        </div>
      </article>

      <div className="container">
        <div className="product-grid">
          {news.map((article, index) => {
            return (
              <div key={index} className="card ">
                {article.urlToImage ? (
                  <img className="image" src={article.urlToImage} />
                ) : (
                  <img src={images} />
                )}
                <div className="card-content">
                  <h3 className="card-title">{article.title}</h3>
                  {article.description ? (
                    <p className="card-description"> {article.description}</p>
                  ) : (
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum, lectus id congue hendrerit, tortor tellus bibendum dolor, vel ullamcorper dui risus id metus."
                  )}
                  <button className="art">
                    <a target="_blank" href={article.url}>
                      Read full article
                    </a>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
