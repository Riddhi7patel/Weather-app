// Constants and variables
const API_KEY = "2399978e19f8a751d24a1b19a2688ea3";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const searchForm = document.querySelector("form");
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search-btn");
const saveBtn = document.querySelector("#save-btn");
const weatherData = document.querySelector("#weather-data");
let defaultCity = localStorage.getItem("defaultCity");

// Functions
function getWeatherData(city) {
  const url = `${BASE_URL}?q=${city}&appid=${API_KEY}&units=imperial`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      console.log(error);
      weatherData.innerHTML =
        "<p>Could not fetch weather data. Please try again later.</p>";
    });
}

function displayWeatherData(data) {
  const { name, main, weather } = data;

  weatherData.innerHTML = `
    <h2>${name}</h2>
    <p><strong>Temperature:</strong> ${main.temp} &deg;F</p>
    <p><strong>Humidity:</strong> ${main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    <p><strong>Description:</strong> ${weather[0].description}</p>
  `;

  weatherData.style.display = "block";
}

function setDefaultCity(city) {
  defaultCity = city;
  localStorage.setItem("defaultCity", city);
  alert(`"${city}" has been saved as your default city.`);
}

// Event listeners
searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city) {
    getWeatherData(city);
    cityInput.value = "";
  }
});

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();

  if (city) {
    getWeatherData(city);
    cityInput.value = "";
  }
});

if (defaultCity) {
  getWeatherData(defaultCity);
}

saveBtn.addEventListener("click", () => {
  if (weatherData.style.display === "block") {
    setDefaultCity(weatherData.querySelector("h2").textContent);
  } else {
    alert("Please search for a city first.");
  }
});
