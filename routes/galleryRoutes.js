import express from "express";
import { getImages, saveImages } from "../utils/handlers.js";

const router = express.Router();

export default (image) => {
  router.get("/", (req, res) => {
    const images = getImages();
    res.render("index", { images });
  });

  router.post("/add", image.single("image"), (req, res) => {
    const imagesArray = getImages();
    imagesArray.push({
      image: req.file ? "/images/" + req.file.filename : null,
      name: req.file.filename,
    });
    saveImages(imagesArray);
    res.redirect("/");
  });
  return router;
};
