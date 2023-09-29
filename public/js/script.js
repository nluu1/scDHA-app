$(document).ready(function () {
  console.log("ready!");
  {
    if ($("#fileOpt").prop("checked", true)) {
      $("div.datasetOpt-div").addClass("d-none");
      $("div.fileOpt-div").removeClass("d-none");
    } else {
      console.log("datasetOpt");
      $("div.fileOpt-div").addClass("d-none");
      $("div.datasetOpt-div").removeClass("d-none");
    }

    $("input[type=radio][name=inputRadio]").change(function () {
      if (this.value == "fileOpt") {
        console.log("fileOpt");
        $("div.datasetOpt-div").addClass("d-none");
        $("div.fileOpt-div").removeClass("d-none");
      } else if (this.value == "datasetOpt") {
        console.log("datasetOpt");
        $("div.fileOpt-div").addClass("d-none");
        $("div.datasetOpt-div").removeClass("d-none");
      }
    });
  }

  $("#generate").on("click", function () {

    $("#generate").append(
      '<div class="spinner-border spinner-border-sm" role="status"></div>'
    );
    $("#generate").prop("disabled", true);

    $.ajax({
      url: "/generate",
      type: "POST", // You can change the HTTP method if needed
      dataType: "json", // Change the dataType based on your response type (e.g., "json" or "html")

      success: function (data) {
        // Handle the successful response here

        console.log(data);

        // Remove the spinner and update the button text
        $("#generate").text("Generate");
        $("#generate").prop("disabled", false);
        if (data && data.imagePath && data.csvPath) {
          // Update the src attribute of the image element
          $("#cluster-image").attr("src", data.imagePath);
          $("#cluster-image-download").attr("href", data.imagePath);
          // $("#cluster-image").removeClass('d-none');

          console.log(data.csvPath);
          const tableHeaders = $("#table-header");
          const tableBody = $("#table-body");

          tableHeaders.empty();
          tableBody.empty();

          // Get the keys (table headers) from the first data item
          const headers = Object.keys(data.csvJson[0]);

          // Create a table row for headers
          const headerRow = $("<tr>");

          // Iterate over the headers to create table header cells
          headers.forEach((header) => {
            const th = $("<th>").text(header);
            headerRow.append(th);
          });

          // Append the header row to the table headers
          tableHeaders.append(headerRow);

          // Iterate over the data and create table rows
          data.csvJson.forEach((item) => {
            const row = $("<tr>");

            // Iterate over the headers to create table cells
            headers.forEach((header) => {
              const cell = $("<td>").text(item[header]);
              row.append(cell);
            });

            tableBody.append(row);
          });


          let table = new DataTable("#result-table");

        }
      },

      error: function (error) {
        // Handle errors here
        alert("Error occurred!");
        console.error(error);

        // Remove the spinner and update the button text
        $("#generate").text("Generate");
        $("#generate").prop("disabled", false);
      },
    });
  });

  {
    $("#updateForm").on("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(this);


      $.ajax({
        url: "/upload",
        type: "POST",
        data: formData,
        processData: false, // Prevent jQuery from automatically processing the data
        contentType: false, // Set content type to false for FormData
        success: function (data) {
          // Handle the success response here
          console.log("File uploaded successfully!", data);
          
          // You can update the UI or display a message here
        },
        error: function (error) {
          // Handle errors here
          console.error("Error occurred:", error);

          // You can display an error message to the user if needed
        },
      });


    });
  }

});