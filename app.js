const express = require("express");
const multer = require("multer");
const path = require("path"); // Include the path module

const app = express();
const port = 3000;

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public"))); // Use path.join to construct the correct path

// Set the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Define the route to render the initial form
app.get("/", (req, res) => {
  res.render("index", { imagePath: "" });
});

// Define the route to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    // If no file was uploaded, render the form with an error message
    return res.render("index", {
      imagePath: null,
      error: "Please select a file to upload.",
    });
  }

  // Process the uploaded file (replace with your scDHA logic)
  // For illustration purposes, we'll display the uploaded image directly
  const uploadedImage = req.file.buffer;

  // Render the result page with the uploaded image
  res.render("index", { imagePath: uploadedImage, error: null });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
