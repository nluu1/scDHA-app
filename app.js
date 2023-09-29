const express = require("express");
const multer = require("multer");
const path = require("path"); // Include the path module
const Rintegration = require("r-integration");
const Rscript = require("r-script");
const csv = require("csvtojson");

const {
    exec
} = require("child_process");
const fs = require("fs");

const app = express();
const port = 3000;

// Set up multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
    storage
});

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, "public"))); // Use path.join to construct the correct path

// Set the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// Define the route to render the initial form
app.get("/", (req, res) => {
    res.render("index", {
        imagePath: ""
    });
});

function handleFile(){
    
}

app.post("/generate", async (req, res) => {
    console.log("Rscript");
    Rscript("./scripts/clustering-analysis.R").callSync();
    var r_imagePath = "./public/images/cluster.png";
    var r_csvPath = "./public/dataset/result_table.csv";
    if (fs.existsSync(r_imagePath)) {
        fs.unlinkSync(r_imagePath);
    }
    if (fs.existsSync(r_csvPath)) {
        fs.unlinkSync(r_csvPath);
    }

    var r_imageOldPath = "cluster.png";
    var r_csvOldPath = "result_table.csv";
    fs.rename(r_imageOldPath, r_imagePath, function (err) {
        if (err) throw err;
        console.log("Successfully renamed - AKA moved!");
    });
    fs.rename(r_csvOldPath, r_csvPath, function (err) {
        if (err) throw err;
        console.log("Successfully renamed - AKA moved!");
    });

    console.log("here");
    const jsonArray = await csv().fromFile(r_csvPath);


    const finalImagePath = r_imagePath.replace("./public", "");
    const finalCSVPath = r_csvPath.replace("./public", "");
    res.json({
        imagePath: finalImagePath,
        csvPath: finalCSVPath,
        csvJson: jsonArray,
    });
});



// Define the route to handle file uploads
app.post("/upload", upload.single("file"), (req, res) => {
    console.log("upload");
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

    // Define the path where you want to save the uploaded file
    const filePath = path.join(__dirname, "scripts", "test_matrix.tsv");
    // Write the uploaded file to the specified path
    fs.writeFile(filePath, uploadedImage, (err) => {
        if (err) {
            console.error("Error saving file:", err);
            return res.render("index", {
                imagePath: null,
                error: "Error saving the uploaded file.",
            });
        }

        // If the file was successfully saved, you can send a success response
        res.json({
            imagePath: filePath, // Send the path where the file was saved
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});