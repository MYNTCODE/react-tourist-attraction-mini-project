import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import BackToTopButton from "./component/BackToTopButton";

function App() {
  const [touristService, setTouristService] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState(""); // State for the search keyword

  const getTouristService = async (keywords) => {
    try {
      const result = await axios.get(
        `http://localhost:4001/trips?keywords=${keywords}`
      );
      setTouristService(result.data.data);
    } catch (err) {
      console.error("request error: ", err);
    }
  };

  useEffect(() => {
    // Call the API with the initial empty search keyword
    getTouristService("");
  }, []);

  const handleSearch = () => {
    // Call the API with the current search keyword when the search button is clicked
    getTouristService(searchKeyword);
  };

  return (
    <div className="App">
      <div className="background">
        <div className="head-section">
          <h1>Let's Go !!</h1>

          <div className="searching">
            <div className="searching-input">
              <input
                type="text"
                placeholder="find a place to travel ..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
              <button className="button-search" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="place-list">
          {touristService.map((place) => (
            <div className="result-item" key={place.eid}>
              <div className="content-img-title">
                <img src={place.photos[0]} alt={place.title} />
              </div>
              <div className="content-details">
                <h2>{place.title}</h2>
                <p>{place.description.substring(0, 100)}...</p>

                <a href={place.url} target="_blank" rel="noopener noreferrer">
                  อ่านต่อ
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="footer"></div>
        <BackToTopButton />
      </div>
    </div>
  );
}

export default App;
