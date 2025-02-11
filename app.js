const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-Btn");

searchBtn.addEventListener("click", () => {
  if (searchInput.value.trim() != "") {
    searchInput.blur();

    searchInput.value = "";
  }
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && searchInput.value.trim() != "") {
    searchInput.blur();

    searchInput.value = "";
  }
});
