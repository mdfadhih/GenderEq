fetch("static/json/center-nqs.json")
  .then((response) => response.json())
  .then((data) => {
    const names = [
      "Kindergarten",
      "Academy",
      "Childcare",
      "EarlyLearningCenters",
      "Oshc",
      "Preschool",
    ];

    let currentChart = null;

    function createChart(name) {
      const labels = [...new Set(data.map((item) => item.OverallNQSRating))];
      const datasets = [
        {
          label: `Overall NQS Rating for ${name}`,
          data: labels.map((label) =>
            data
              .filter(
                (item) =>
                  item.OverallNQSRating === label &&
                  item[`Count_of_${name}Name`]
              )
              .reduce((acc, item) => acc + item[`Count_of_${name}Name`], 0)
          ),
          backgroundColor: labels.map(
            (label) =>
              `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
                Math.random() * 256
              )}, ${Math.floor(Math.random() * 256)})`
          ),
          hoverOffset: 4,
        },
      ];

      const config = {
        type: "doughnut",
        data: {
          labels: labels,
          datasets: datasets,
        },
      };

      return new Chart(document.getElementById("chart"), config);
    }

    const chartDropdown = document.getElementById("chart-dropdown");
    const chartCanvas = document.getElementById("chart");

    currentChart = createChart("Kindergarten");

    chartDropdown.addEventListener("change", (e) => {
      const selectedChart = e.target.value;

      if (currentChart) {
        currentChart.destroy();
      }

      currentChart = createChart(
        selectedChart.charAt(0).toUpperCase() + selectedChart.slice(1)
      );
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

// fetch("static/json/center-nqs.json")
//   .then((response) => response.json())
//   .then((data) => {
//     const names = [
//       "Kindergarten",
//       "Academy",
//       "Childcare",
//       "EarlyLearningCenters",
//       "Oshc",
//       "Preschool",
//     ];

//     let currentChart = null;

//     function createChart(name) {
//       const labels = [...new Set(data.map((item) => item.OverallNQSRating))];
//       const datasets = [
//         {
//           label: `Overall NQS Rating for ${name}`,
//           data: labels.map((label) =>
//             data
//               .filter(
//                 (item) =>
//                   item.OverallNQSRating === label &&
//                   item[`Count_of_${name}Name`]
//               )
//               .reduce((acc, item) => acc + item[`Count_of_${name}Name`], 0)
//           ),
//           backgroundColor: labels.map(
//             (label) =>
//               `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
//                 Math.random() * 256
//               )}, ${Math.floor(Math.random() * 256)})`
//           ),
//           hoverOffset: 4,
//         },
//       ];

//       const config = {
//         type: "bar", // Using bar chart
//         data: {
//           labels: labels,
//           datasets: datasets,
//         },
//         options: {
//           onClick: (event, elements) => {
//             if (elements.length > 0) {
//               const element = elements[0];
//               const label = labels[element.index]; // Get the label of the clicked bar
//               const value = datasets[0].data[element.index]; // Get the value of the clicked bar

//               console.log(`Label: ${label}, Value: ${value}`);

//               // Update the offcanvas drawer with data
//               document.getElementById("careTypeTitle").textContent = label;
//               const careCenters = data
//                 .filter(
//                   (item) =>
//                     item.OverallNQSRating === label &&
//                     item[`Count_of_${name}Name`]
//                 )
//                 .map((item) => item.CenterName); // Assuming "CenterName" exists in your data

//               const careCenterList = document.getElementById("careCenterList");
//               careCenterList.innerHTML = "";
//               careCenters.forEach((center) => {
//                 console.log("cetre", center);
//                 const li = document.createElement("li");
//                 li.classList.add("list-group-item");
//                 li.textContent = center;
//                 careCenterList.appendChild(li);
//               });

//               // Show the offcanvas drawer
//               const offcanvas = new bootstrap.Offcanvas(
//                 document.getElementById("offcanvasExample")
//               );
//               offcanvas.show();
//             }
//           },
//         },
//       };

//       return new Chart(document.getElementById("chart"), config);
//     }

//     const chartDropdown = document.getElementById("chart-dropdown");
//     const chartCanvas = document.getElementById("chart");

//     currentChart = createChart("Kindergarten");

//     chartDropdown.addEventListener("change", (e) => {
//       const selectedChart = e.target.value;

//       if (currentChart) {
//         currentChart.destroy();
//       }

//       currentChart = createChart(
//         selectedChart.charAt(0).toUpperCase() + selectedChart.slice(1)
//       );
//     });
//   })
//   .catch((error) => console.error("Error fetching data:", error));
