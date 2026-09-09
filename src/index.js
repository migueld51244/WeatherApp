import "./style.css";

const locationInput = document.querySelector("#search-local");
const searchButton = document.querySelector(".search-location-btn");
const local = document.querySelector("p.local");
const localDesc = document.querySelector("p.local-desc");
const statusIcon = document.querySelector(".status-icon");
const temperatureP = document.querySelector(".temperature-p");
const humidityP = document.querySelector(".humidity-p");
const windP = document.querySelector(".wind-p");
const timeP = document.querySelector(".time-p");
const switchUnitBtn = document.querySelector("button.unit-switcher-btn");
const forecastArea = document.querySelector(".forecast-wrapper");

import clearDay from "./assets/images/clear-day.png";
import clearNight from "./assets/images/clear-night.png";
import cloudy from "./assets/images/cloudy.png";
import fog from "./assets/images/fog.png";
import partlyCloudyDay from "./assets/images/partly-cloudy-day.png";
import partlyCloudyNight from "./assets/images/partly-cloudy-night.png";
import rain from "./assets/images/rain.png";
import snow from "./assets/images/snow.png";
import wind from "./assets/images/fog.png";

let data;
let unit = null;

function getLocation() {
  const location = locationInput.value;
  return encodeURIComponent(location);
}

searchButton.addEventListener("click", async () => {
  const location = getLocation();
  data = await getLocationData(location);
  populateOverallStatus(data);
  populateDetailedStatus(data);
  populateLocationDescription(data);
  generateForecast(data);
});

switchUnitBtn.addEventListener("click", (e) => {
  switchUnits();
});

async function getLocationData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=3C2DHMPPBS5NBWY7NCA4C7LTT&unitGroup=metric`,
    );
    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.error(error);
  }
}

function populateOverallStatus(data) {
  getIcon(data.currentConditions.icon);
  temperatureP.textContent = `Temperature: ${data.currentConditions.temp} ºC`;
}

function populateDetailedStatus(data) {
  humidityP.textContent = `Humidity: ${data.currentConditions.humidity} %`;
  windP.textContent = `Wind Speed: ${data.currentConditions.windspeed} km/h`;
  timeP.textContent = `Time: ${data.currentConditions.datetime}`;
}

function populateLocationDescription(data) {
  local.textContent = data.address;
  localDesc.textContent = data.description;
}

function getIcon(data) {
  if (data === "clear-day") {
    statusIcon.src = clearDay;
  } else if (data === "clear-night") {
    statusIcon.src = clearNight;
  } else if (data === "cloudy") {
    statusIcon.src = cloudy;
  } else if (data === "fog") {
    statusIcon.src = fog;
  } else if (data === "partly-cloudy-day") {
    statusIcon.src = partlyCloudyDay;
  } else if (data === "partly-cloudy-night") {
    statusIcon.src = partlyCloudyNight;
  } else if (data === "rain") {
    statusIcon.src = rain;
  } else if (data === "snow") {
    statusIcon.src = snow;
  } else if (data === "wind") {
    statusIcon.src = wind;
  }
}

function switchUnits() {
  const dayTemp = document.querySelectorAll("day-temp");
  if (!unit) return;
  if (unit === "celsius") {
    // Get temperature
    const temp = data.currentConditions.temp;
    const tempInFahrenheit = (temp * 1.8 + 32).toFixed(1);
    temperatureP.textContent = `Temperature: ${tempInFahrenheit} ºF`;
    dayTemp.forEach((p) => {
      p.textContent = `${tempInFahrenheit} ºF`;
    });
    unit = "fahrenheit";
  } else if (unit === "fahrenheit") {
    temperatureP.textContent = `Temperature: ${data.currentConditions.temp} ºC`;
    unit = "celsius";
    dayTemp.forEach((p) => {
      p.textContent = `${data.currentConditions.temp} ºC`;
    });
  }
}

function generateForecast(data) {
  forecastArea.innerHTML = "";
  data.days.forEach((day) => {
    const dayWrapper = document.createElement("div");
    dayWrapper.classList.add("day-wrapper");
    const temperature = document.createElement("p");
    temperature.classList.add("day-temp");
    const date = document.createElement("p");
    date.classList.add("day-date");
    temperature.textContent = day.temp;
    date.textContent = day.datetime;
    dayWrapper.append(date, temperature);
    forecastArea.append(dayWrapper);
  });
}
