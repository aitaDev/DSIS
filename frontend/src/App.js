import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  const BACKEND = "http://10.28.3.14:5000"; // ← change this after testing

  useEffect(() => {
    fetch(`${BACKEND}/api/images`)
      .then(res => res.json())
      .then(data => setImages(data));
  }, []);

  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images]);

  if (images.length === 0) return <div style={{ color: "white" }}>No images found.</div>;

  return (
    <div className="App">
      <img
        src={`${BACKEND}/images/${images[index]}`}
        alt=""
        className="slideshow-img"
      />
    </div>
  );
}

export default App;
