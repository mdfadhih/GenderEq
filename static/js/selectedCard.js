document.addEventListener("DOMContentLoaded", function () {
  let activeCard = null;

  // Function to handle card click
  function handleCardClick(card) {
    if (activeCard) {
      const previousH6 = activeCard.querySelector("h6");
      const previousP = activeCard.querySelector("p");
      if (previousH6) {
        previousH6.style.color = "black";
      }
      if (previousP) {
        previousP.style.fontWeight = "normal";
        previousP.style.color = "black";
      }
    }

    const h6Element = card.querySelector("h6");
    const pElement = card.querySelector("p");
    if (h6Element) {
      h6Element.style.color = "white";
    }
    if (pElement) {
      pElement.style.fontWeight = "400";
      pElement.style.color = "white";
    }

    activeCard = card;
  }

  const firstCard = document.getElementById("firstCard");
  if (firstCard) {
    firstCard.click();
    handleCardClick(firstCard);
  }

  // Attach event listeners to all cards
  const allCards = document.querySelectorAll(".card");
  allCards.forEach((card) => {
    card.addEventListener("click", function () {
      handleCardClick(card);
    });
  });
});

function benefits_score() {
  let ScoreDecimal = score / 100;
  document.getElementById("be_score").innerHTML = ScoreDecimal.toFixed(4);
}
