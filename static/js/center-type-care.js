// Fetch the dataset
fetch("/static/json/center-type-care.json")
  .then((response) => response.json())
  .then((data) => {
    const careTypeCounts = {
      "Long Day Care": 0,
      "Preschool/Kindergarten - Stand alone": 0,
      "Preschool/Kindergarten - Part of a School": 0,
      "Outside school Hours Care - Vacation Care": 0,
      "Outside school Hours Care - Before School": 0,
      "Outside school Hours Care - After School": 0,
    };

    const careTypeCenters = {
      "Long Day Care": [],
      "Preschool/Kindergarten - Stand alone": [],
      "Preschool/Kindergarten - Part of a School": [],
      "Outside school Hours Care - Vacation Care": [],
      "Outside school Hours Care - Before School": [],
      "Outside school Hours Care - After School": [],
    };

    // Iterate and update the counts and lists
    data.forEach((center) => {
      if (center["Long Day Care"] === "Yes") {
        careTypeCounts["Long Day Care"]++;
        careTypeCenters["Long Day Care"].push(center);
      }
      if (center["Preschool/Kindergarten - Stand alone"] === "Yes") {
        careTypeCounts["Preschool/Kindergarten - Stand alone"]++;
        careTypeCenters["Preschool/Kindergarten - Stand alone"].push(center);
      }
      if (center["Preschool/Kindergarten - Part of a School"] === "Yes") {
        careTypeCounts["Preschool/Kindergarten - Part of a School"]++;
        careTypeCenters["Preschool/Kindergarten - Part of a School"].push(
          center
        );
      }
      if (center["Outside school Hours Care - Vacation Care"] === "Yes") {
        careTypeCounts["Outside school Hours Care - Vacation Care"]++;
        careTypeCenters["Outside school Hours Care - Vacation Care"].push(
          center
        );
      }
      if (center["Outside school Hours Care - Before School"] === "Yes") {
        careTypeCounts["Outside school Hours Care - Before School"]++;
        careTypeCenters["Outside school Hours Care - Before School"].push(
          center
        );
      }
      if (center["Outside school Hours Care - After School"] === "Yes") {
        careTypeCounts["Outside school Hours Care - After School"]++;
        careTypeCenters["Outside school Hours Care - After School"].push(
          center
        );
      }
    });

    const labels = Object.keys(careTypeCounts);
    const dataPoints = Object.values(careTypeCounts);

    const ctx = document.getElementById("myChart1").getContext("2d");
    const myChart1 = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        plugins: {},
        datasets: [
          {
            label: "Number of Centers Offering Each Care Type",
            data: dataPoints,
            backgroundColor: "#936ed4",
            borderColor: "#ffd9ef",
            borderWidth: 2,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Click on Each Bar to Determine Centers based on Timing Conditions",
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
            const careType = labels[clickedElementIndex];

            document.getElementById("careTypeTitle").textContent = careType;

            const centers = careTypeCenters[careType];
            const careCenterList = document.getElementById("careCenterList");
            careCenterList.innerHTML = "";

            centers.forEach((center) => {
              const listItem = document.createElement("li");
              listItem.className = "list-group-item";
              listItem.classList.add("text-xl", "font-medium");
              listItem.textContent =
                center.AcademyName ||
                center.ChildcareName ||
                center.KindergartenName ||
                center.OshcName ||
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
  })
  .catch((error) => console.error("Error fetching or processing data:", error));
