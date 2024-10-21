fetch("/static/json/kindergarten.json")
  .then((response) => response.json())
  .then((data) => {
    const centerTypes = new Set();
    data.forEach((center) => {
      if (center.OshcName) centerTypes.add("OSHC");
      if (center.AcademyName) centerTypes.add("Academy");
      if (center.ChildcareName) centerTypes.add("Childcare");
      if (center.KindergartenName) centerTypes.add("Kindergarten");
      if (center.EarlyLearningCentersName)
        centerTypes.add("Early Learning Center");
      if (center.PreschoolName) centerTypes.add("Preschool");
    });

    const dropdown = document.getElementById("centerTypeDropdown");
    centerTypes.forEach((type) => {
      const option = document.createElement("option");
      option.value = type;
      option.textContent = type;
      dropdown.appendChild(option);
    });
    dropdown.value = "Kindergarten";

    function filterDataByCenterType(selectedType) {
      return data.filter((center) => {
        if (selectedType === "OSHC" && center.OshcName) return true;
        if (selectedType === "Academy" && center.AcademyName) return true;
        if (selectedType === "Childcare" && center.ChildcareName) return true;
        if (selectedType === "Kindergarten" && center.KindergartenName)
          return true;
        if (
          selectedType === "Early Learning Center" &&
          center.EarlyLearningCentersName
        )
          return true;
        if (selectedType === "Preschool" && center.PreschoolName) return true;
        return selectedType === "all";
      });
    }

    let myChart = null;
    renderChart(data);
    dropdown.addEventListener("change", (event) => {
      const selectedType = event.target.value;
      const filteredData = filterDataByCenterType(selectedType);
      renderChart(filteredData);
    });

    function renderChart(filteredData) {
      const changesByYear = {};
      filteredData.forEach((center) => {
        const year = center.Year;
        const previousRating = center.PreviousOverallNQSRating;
        const currentRating = center.OverallNQSRating;

        if (previousRating && currentRating) {
          if (!changesByYear[year]) {
            changesByYear[year] = {
              increase: 0,
              decrease: 0,
              centers: { increase: [], decrease: [] },
            };
          }

          if (currentRating !== previousRating) {
            if (
              currentRating === "Exceeding NQS" &&
              previousRating !== "Exceeding NQS"
            ) {
              changesByYear[year].increase++;
              changesByYear[year].centers.increase.push(center);
            } else if (
              currentRating !== "Exceeding NQS" &&
              previousRating === "Exceeding NQS"
            ) {
              changesByYear[year].decrease++;
              changesByYear[year].centers.decrease.push(center);
            }
          }
        }
      });

      const labels = Object.keys(changesByYear);
      const dataPointsIncrease = labels.map(
        (year) => changesByYear[year].increase
      );
      const dataPointsDecrease = labels.map(
        (year) => changesByYear[year].decrease
      );

      if (myChart) {
        myChart.destroy();
      }

      const ctx = document.getElementById("myChart").getContext("2d");
      myChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Increase in NQS Rating",
              data: dataPointsIncrease,
              backgroundColor: "#936ed4",
              borderColor: "#ffd9ef",
              borderWidth: 2,
            },
            {
              label: "Decrease in NQS Rating",
              data: dataPointsDecrease,
              backgroundColor: "#ffd9ef",
              borderColor: "#936ed4",
              borderWidth: 2,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "Click on Each Bar to identify Centers with Variations in NQS Ratings",
              color: "#9363d4",
              font: {
                size: 16,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          onClick: (event, elements) => {
            if (elements.length > 0) {
              const clickedElementIndex = elements[0].index;
              const clickedDatasetIndex = elements[0].datasetIndex;
              const year = labels[clickedElementIndex];
              const changeType =
                clickedDatasetIndex === 0 ? "increase" : "decrease";

              // Get the centers for the selected year and change type
              const centers = changesByYear[year].centers[changeType];

              // Update the offcanvas title
              document.getElementById("careTypeTitle").textContent = `${
                changeType === "increase" ? "Increased" : "Decreased"
              } in ${year}`;

              // Clear previous list items and populate with new centers
              const careCenterList = document.getElementById("careCenterList");
              careCenterList.innerHTML = "";
              centers.forEach((center) => {
                const listItem = document.createElement("li");
                listItem.className = "list-group-item";
                listItem.classList.add("text-xl", "font-medium");
                listItem.textContent =
                  center.KindergartenName ||
                  center.OshcName ||
                  center.ChildcareName ||
                  center.AcademyName ||
                  center.EarlyLearningCentersName ||
                  center.PreschoolName;
                careCenterList.appendChild(listItem);
              });

              const offcanvasElement =
                document.getElementById("offcanvasExample");
              const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
              bsOffcanvas.show();
            }
          },
        },
      });
    }
  })
  .catch((error) => console.error("Error fetching or processing data:", error));
