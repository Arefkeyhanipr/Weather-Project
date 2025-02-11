const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-Btn");

const apiKey = "dec9e32983e1e4b158d7e7b071f4bc9d";

searchBtn.addEventListener("click", () => {
  if (searchInput.value.trim() != "") {
    searchInput.blur();

    updateWeatherInfo(searchInput.value);

    searchInput.value = "";
  }
});

searchInput.addEventListener("keydown", (e) => {
  if (e.key == "Enter" && searchInput.value.trim() != "") {
    searchInput.blur();

    updateWeatherInfo(searchInput.value);

    searchInput.value = "";
  }
});

async function getFetchData(endpoint, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);

  return response.json();
}

async function updateWeatherInfo(city) {
  const weatherData = await getFetchData("weather", city);

  console.log(weatherData);
}
