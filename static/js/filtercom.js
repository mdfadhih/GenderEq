function filtercompanies() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let cards = document.querySelectorAll("#companyList");
  let counter = 0;
  let noResultMessage = document.getElementById("noResultMessage");

  cards.forEach(function (card) {
    let companyName = card
      .querySelector(".card-title")
      .textContent.toLowerCase();
    if (companyName.includes(input)) {
      card.style.display = "";
      counter++;
    } else {
      card.style.display = "none";
    }
  });

  if (counter === 0) {
    noResultMessage.style.display = "block";
    document.getElementById("noResultImage").innerHTML = `
      <img src="static/images/Filters/no-result.png" width="80px" alt="noResult" >'
    `;
  } else {
    document.getElementById("noResultImage").innerHTML = ``;
    noResultMessage.style.display = "none";
  }
}
