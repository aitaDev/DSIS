const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const IMAGE_DIR = path.join(__dirname, "images");

app.get("/api/images", (req, res) => {
    fs.readdir(IMAGE_DIR, (err, files) => {
        if (err) return res.status(500).json({ error: "Could not read images." });

        const images = files.filter(f =>
            f.toLowerCase().match(/\.(jpg|jpeg|png|gif|webp)$/)
        );

        res.json(images);
    });
});

// Serve actual image files
app.get("/images/:filename", (req, res) => {
    res.sendFile(path.join(IMAGE_DIR, req.params.filename));
});

// Start server accessible to Smart TVs on LAN
app.listen(5000, "10.28.3.14", () => {
    console.log("Slideshow backend running on http://10.28.3.14:5000");
});
