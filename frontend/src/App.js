import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const BACKEND = "http://10.28.3.14:5000";

  // Initial load
  useEffect(() => {
    fetch(`${BACKEND}/api/images`)
      .then(res => res.json())
      .then(data => setImages(data));
  }, []);

  // Refresh images list every 10 seconds to detect new files
  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${BACKEND}/api/images`)
        .then(res => res.json())
        .then(data => {
          setImages(prev => {
            // Only update if different to avoid reset flicker
            if (JSON.stringify(prev) !== JSON.stringify(data)) {
              return data;
            }
            return prev;
          });
        });
    }, 10000); // every 10 seconds

    return () => clearInterval(interval);
  }, []);

  // Slideshow timer with fade transition
  useEffect(() => {
    if (images.length === 0) return;

    const timer = setInterval(() => {
      setFade(false); // start fade-out

      setTimeout(() => {
        setIndex(prev => (prev + 1) % images.length);
        setFade(true); // fade-in next image
      }, 400); // fade transition duration
    }, 15000);

    return () => clearInterval(timer);
  }, [images]);

  if (images.length === 0)
    return <div style={{ color: "white" }}>No images found.</div>;

  return (
    <div className="App">
      <img
        src={`${BACKEND}/images/${images[index]}`}
        alt=""
        className={`slideshow-img ${fade ? "fade-in" : "fade-out"}`}
      />
    </div>
  );
}

export default App;
