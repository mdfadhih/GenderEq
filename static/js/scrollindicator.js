const scrolContainer = document.querySelector(".scrol");
const scrollIndicator = document.getElementById("scrollIndicator");

scrolContainer.addEventListener("scroll", function () {
  const scrollTop = scrolContainer.scrollTop;
  const scrollHeight =
    scrolContainer.scrollHeight - scrolContainer.clientHeight;
  const scrollPercentage = (scrollTop / scrollHeight) * 100;
  scrollIndicator.style.width = scrollPercentage + "%";
});
