# scDHA-cell-clustering
a web application that utilizes the scDHA package to analyze single-cell data  
The app allows:
- Ask users to select the input by either:
      - Uploading a single-cell RNA-seq matrix in the format of a tab-delimited text file (tsv) with the first row as gene names and the first column as cell IDs, OR
      - Selecting a built-in dataset
- Once the input is selected, perform cell clustering using the scDHA package, and display the clustering results as:
      - A scatter plot of the cell landscape, colored by cell clusters with a legend. The 2D coordinates of the cells should be obtained from the scDHA package.
      - A table with two columns: cell ID and cell cluster
- Allow users to export the plot as a PNG file, with customizable width and height.
- Allow users to download the result table as a tab-delimited text file (tsv).
- Allow users to download the compressed data (latent space) of the input as a tab-delimited text file (tsv). Note that this is NOT the 2D compressed data.
- Allows multiple users to use the app at the same time (different users on different computers should be able to use the app at the same time without waiting for others)

# Stack
## Frontend
HTML (EJS), CSS (Boostrap), Javascripts (JQuery, Datatable)

## Backend
NodeJS (Express)  
### Installed Packages:  
multer: for file handling  
path: get path  
fs: file handling  
r-script:  run r scripts  
csvtojson: convert csv file to json data  
sharp: process images  

# Instructions:
Requires R installed
If using Windows OS, make sure Path env is set

To install require packages
```
npm install
```

To start
```
node app.js
```
