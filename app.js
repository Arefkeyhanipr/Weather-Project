const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-Btn");

const WeatherInfoSection = document.querySelector(".weather-info");
const notFoundSection = document.querySelector(".not-found");
const searchCitySection = document.querySelector(".search-city");

const countryText = document.querySelector(".country-text");
const tempText = document.querySelector(".temp-text");
const conditionText = document.querySelector(".condition-text");
const humidityValueText = document.querySelector(".humidity-value-text");
const windValueText = document.querySelector(".wind-value-text");
const weatherSummaryImg = document.querySelector(".weather-summery-img");
const currentDateText = document.querySelector(".current-date-text");

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

function getWeatherIcon(id) {
  if (id <= 232) return "thunderstorm.svg";
  if (id <= 321) return "drizzle.svg";
  if (id <= 531) return "rain.svg";
  if (id <= 622) return "snow.svg";
  if (id <= 781) return "atmosphere.svg";
  if (id <= 800) return "clear.svg";
  else return "clouds.svg";
}

function getCurrentData() {
  const currentDate = new Date();
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
  };
  return currentDate.toLocaleDateString("en-GB", options);
}

async function getFetchData(endpoint, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endpoint}?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);

  return response.json();
}

async function updateWeatherInfo(city) {
  const weatherData = await getFetchData("weather", city);

  if (weatherData.cod != 200) {
    showDisplaySection(notFoundSection);
    return;
  }

  const {
    name: country,
    main: { temp, humidity },
    weather: [{ id, main }],
    wind: { speed },
  } = weatherData;

  countryText.innerHTML = country;
  tempText.innerHTML = `${Math.round(temp)} °C`;
  conditionText.innerHTML = main;
  humidityValueText.innerHTML = `${humidity} %`;
  windValueText.innerHTML = `${speed} M/s`;

  currentDateText.innerHTML = getCurrentData();

  weatherSummaryImg.src = `/weather/${getWeatherIcon(id)}`;

  showDisplaySection(WeatherInfoSection);
}

function showDisplaySection(section) {
  [WeatherInfoSection, searchCitySection, notFoundSection].forEach(
    (section) => (section.style.display = "none")
  );

  section.style.display = "flex";
}
