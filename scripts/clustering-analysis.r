### Uncomment this block if run on shiny app

# # Check if the torch package is already installed
# if (!requireNamespace("torch", quietly = TRUE)) {
#   # If not installed, install it
#   install.packages("torch")
#   # Load the torch package
#   library(torch)
#   # Install PyTorch for R
#   torch::install_torch()
# }

# packages <- c("scDHA","torch")

# for(p in packages){
#   if(!require(p,character.only = TRUE)) install.packages(p)
#   library(p,character.only = TRUE)
# }


## Require for r-script to be run by nodejs
needs(scDHA)
needs(torch)
print("Installing packages")
torch::install_torch()
library("scDHA")

# Get sample data
data('Goolam'); data <- t(Goolam$data); label <- as.character(Goolam$label)
#Transform data
data <- log2(data + 1)
#Generate clustering result, the input matrix has rows as samples and columns as genes
result <- scDHA(data, seed = 1)
#The clustering result 
cluster <- result$cluster
#Generate 2D representation, the input is the output from scDHA function
result <- scDHA.vis(result, seed = 1)

# CLUSTER IMAGE ------------------------------
# Specify the file name for the PNG image
png("cluster.png", width = 800, height = 600)  # Adjust width and height as needed
#Plot the representation of the dataset, different colors represent different cell types
plot(result$pred, col=factor(label), xlab = "scDHA1", ylab = "scDHA2")
# Close the PNG device
dev.off()


# 2D COMPRESS TABLE OUTPUT ------------------------------
# Result table output (2D Compressed)
gene_ids <- rownames(data)
result_table <- data.frame(Gene_ID = gene_ids, Cell_Cluster = cluster)
write.csv(result_table, file = "result_table.csv", row.names = FALSE)
