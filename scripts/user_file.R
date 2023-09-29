# needs(scDHA)
library("scDHA")
# data1 <- as.matrix(data.table::fread('test_matrix.tsv', header = TRUE,row.names = 1, sep = '\t'))
data1 <- data.table::fread('test_matrix.tsv', sep = '\t',data.table = FALSE)
# move column "V1" to rownames and remove 
rownames(data1) <- data1[, 1]
data1[, 1] <- NULL

#convert to matrix
data1 <- as.matrix(data1)


label <- as.character(rownames(data1))

print("here")
# SAME WITH THE OTHER SCRIPTS

#Transform data
data1 <- log2(data1 + 1)
# print(data)
#Generate clustering result, the input matrix has rows as samples and columns as genes
result <- scDHA(data1, seed = 1)
# print(result)
# print(class(result$pred))
#The clustering result 
cluster <- result$cluster
#Generate 2D representation, the input is the output from scDHA function
result <- scDHA.vis(result, seed = 1)
# print(class(result$pred))
# CLUSTER IMAGE ------------------------------
# Specify the file name for the PNG image
png("cluster.png", width = 800, height = 600)  # Adjust width and height as needed
#Plot the representation of the dataset, different colors represent different cell types
plot(result$pred, col=factor(label), xlab = "scDHA1", ylab = "scDHA2")
# print(class(result$pred))
# Close the PNG device
dev.off()

print("done!")

# 2D COMPRESS TABLE OUTPUT ------------------------------
# Result table output (2D Compressed)
# gene_ids <- rownames(data1)
# result_table <- data.frame(Gene_ID = gene_ids, Cell_Cluster = cluster)
# write.csv(result_table, file = "result_table.csv", row.names = FALSE)