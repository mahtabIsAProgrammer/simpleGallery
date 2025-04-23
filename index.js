import fs from "fs";
import path from "path";
import multer from "multer";
import express from "express";
import galleryRoutes from "./routes/galleryRoutes.js";

// express setup
const app = express();
const PORT = 3002;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("images"));
app.use(express.static("public"));
app.use(express.static("utils"));
app.set("view engine", "ejs");

//folder images setup
if (!fs.existsSync("images.json")) fs.writeFileSync("images.json", "[]");
if (!fs.existsSync("images")) fs.mkdirSync("images");

// multer Setup
const storage = multer.diskStorage({
  destination: "images/",
  filename: (_, file, cb) => {
    const originalName = path.basename(
      file.originalname,
      path.extname(file.originalname)
    );
    const extension = path.extname(file.originalname);
    const newFileName = `${originalName}${extension}`;
    cb(null, newFileName);
  },
});
const imageUpload = multer({ storage });

// routes setup
app.use("/", galleryRoutes(imageUpload));

// Port setup
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
