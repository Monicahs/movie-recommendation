import React, { useState } from "react";
import "./App.css";
import movieicon from './assets/movie_2217586.png';
import mov1 from './assets/matrix.jpg';
import mov2 from './assets/apollo.jpg';
import mov3 from './assets/batman.jpg';
import mov4 from './assets/avatar.jpg';

function App() {
  const [movieTitle, setMovieTitle] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRecommendations([]); // Reset recommendations
    setError("");

    try {
      const response = await fetch(`http://127.0.0.1:5000/recommend?movie_title=${movieTitle}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (response.ok) {
        if (Array.isArray(data)) {
          setRecommendations(data); // Ensure only arrays are set
        } else {
          setError("No Movies found.");
        }
      } else {
        setError(data.error || "An error occurred!");
      }
    } catch (error) {
      setError("Unable to connect to the API.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="app-container">
        <img className="m" src={movieicon} alt="Movie Icon" />
        <h1>Movie Recommendation App</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <input
            type="text"
            value={movieTitle}
            onChange={(e) => setMovieTitle(e.target.value)}
            placeholder="Enter Hollywood movie title..."
            className="input-text"
          />
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Processing..." : "Get Recommendations"}
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
        <div className="recommendations-container">
          <h2>Recommendations:</h2>
          <ul>
            {Array.isArray(recommendations) && recommendations.length > 0 ? (
              recommendations.map((movie, index) => (
                <li key={index}>{movie.title}</li>
              ))
            ) : (
              !error && <li>No recommendations available.</li>
            )}
          </ul>
        </div>
      </div>
      <div className="images">
        <img src={mov1} alt="Movie 1" />
        <img src={mov2} alt="Movie 2" />
        <img src={mov3} alt="Movie 3" />
        <img src={mov4} alt="Movie 4" />
      </div>
    </div>
  );
}

export default App;
