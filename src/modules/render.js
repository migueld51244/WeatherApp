import { parse, format } from "date-fns";

import clearDay from "../assets/images/clear-day.png";
import clearNight from "../assets/images/clear-night.png";
import cloudy from "../assets/images/cloudy.png";
import fog from "../assets/images/fog.png";
import partlyCloudyDay from "../assets/images/partly-cloudy-day.png";
import partlyCloudyNight from "../assets/images/partly-cloudy-night.png";
import rain from "../assets/images/rain.png";
import snow from "../assets/images/snow.png";
import wind from "../assets/images/fog.png";
import { unit } from "../index.js";
const locationInput = document.querySelector("#search-local");
const searchButton = document.querySelector(".search-location-btn");
const local = document.querySelector("p.local");
const localDesc = document.querySelector("p.local-desc");
const image = document.querySelector(".status-icon");
const temperatureP = document.querySelector(".temperature-p");
const humidityP = document.querySelector(".humidity-p");
const windP = document.querySelector(".wind-p");
const timeP = document.querySelector(".time-p");
const switchUnitBtn = document.querySelector("button.unit-switcher-btn");
const forecastArea = document.querySelector(".forecast-wrapper");
const errorMessage = document.querySelector(".error-message");
const fullDayWrapper = document.querySelector(".full-day-wrapper");



// Weather details
const sunset = document.querySelector(".sunset-p");
const sunrise = document.querySelector(".sunrise-p");
const timezone = document.querySelector(".timezone-p");
const windDir = document.querySelector(".wind-dir-p");
const windGust = document.querySelector(".wind-gust-p");
const uvIndex = document.querySelector(".uv-index-p");
const visibility = document.querySelector(".visibility-p");
const pressure = document.querySelector(".pressure-p");
const cloudCover = document.querySelector(".cloud-cover-p");

function generateForecast(data) {
  if (!data) return;
  forecastArea.innerHTML = "";
  data.days.forEach((day) => {
    const dayWrapper = document.createElement("div");
    dayWrapper.classList.add("day-wrapper");
    const icon = document.createElement("img");
    getIcon(day.icon, icon);
    const dayInfoWrapper = document.createElement("div");
    dayInfoWrapper.classList.add("day-info-wrapper");
    const temperatureWrapper = document.createElement("div");
    temperatureWrapper.classList.add("temperature-wrapper");
    const temperature = document.createElement("p");
    const minTemp = document.createElement("p");
    const maxTemp = document.createElement("p");
    minTemp.textContent = `Min: ${formatTemperature(day.tempmin)}`;
    maxTemp.textContent = `Max: ${formatTemperature(day.tempmax)}`;
    temperature.classList.add("day-temp");
    const date = document.createElement("p");
    date.classList.add("day-date");
    temperature.textContent = `Temp: ${formatTemperature(day.temp)}`;
    // Parse and format date to dd-MM-yyyy format
    const dateTime = day.datetime; // yyyy-MM-dd
    const parsedDate = parse(dateTime, "yyyy-MM-dd", new Date());
    const formattedDate = format(parsedDate, "dd-MM-yyyy");
    date.textContent = formattedDate;
    temperatureWrapper.append(minTemp, temperature, maxTemp);
    dayInfoWrapper.append(date, temperatureWrapper);
    dayWrapper.append(icon, dayInfoWrapper);
    forecastArea.append(dayWrapper);
  });
}

function generateFullDayForecast(data) {
  if (!data) return;
  fullDayWrapper.innerHTML = "";
  const fragment = document.createDocumentFragment();
  const weatherSource = data.days[0].hours;
  for (const hour of weatherSource) {
    const container = document.createElement("div");
    container.classList.add("day-item");
    const temp = document.createElement("p");
    temp.textContent = `${formatTemperature(hour.temp)}`;
    const time = document.createElement("p");
    // Parse and format hours to 12 Hour format
    const hours = hour.datetime; // 24 Hour Format
    const parsedHour = parse(hours, "HH:mm:ss", new Date());
    const formattedHour = format(parsedHour, "hh:mm a");
    time.textContent = `${formattedHour}`;

    const icon = document.createElement("img");
    getIcon(hour.icon, icon);
    container.append(icon, time, temp);
    fragment.append(container);
  }
  fullDayWrapper.append(fragment);
}

function generateWeatherDetails(data) {
  if (!data) return;

  sunset.textContent = `Sunset at: ${data.currentConditions.sunset}`;
  sunrise.textContent = `Sunrise at: ${data.currentConditions.sunrise}`;
  timezone.textContent = `Timezone: ${data.timezone}`;
  windDir.textContent = `Wind Direction: ${data.currentConditions.winddir} º`;
  windGust.textContent = `Wind Gust: ${data.currentConditions.windgust} km/s`;
  uvIndex.textContent = `UV Index: ${data.currentConditions.uvindex}`;
  visibility.textContent = `Visibility: ${data.currentConditions.visibility} km`;
  pressure.textContent = `Pressure: ${data.currentConditions.pressure} hPa`;
  cloudCover.textContent = `Cloud cover: ${data.currentConditions.cloudcover} %`;
}

function populateOverallStatus(data) {
  if (!data) return;
  getIcon(data.currentConditions.icon, image);
  temperatureP.textContent = `Temperature: ${formatTemperature(data.currentConditions.temp)}`;
}

function populateDetailedStatus(data) {
  if (!data) return;
  humidityP.textContent = `Humidity: ${data.currentConditions.humidity} %`;
  windP.textContent = `Wind Speed: ${data.currentConditions.windspeed} km/h`;
  timeP.textContent = `Time: ${data.currentConditions.datetime}`;
}
function getIcon(data, image) {
  if (data === "clear-day") {
    image.src = clearDay;
  } else if (data === "clear-night") {
    image.src = clearNight;
  } else if (data === "cloudy") {
    image.src = cloudy;
  } else if (data === "fog") {
    image.src = fog;
  } else if (data === "partly-cloudy-day") {
    image.src = partlyCloudyDay;
  } else if (data === "partly-cloudy-night") {
    image.src = partlyCloudyNight;
  } else if (data === "rain") {
    image.src = rain;
  } else if (data === "snow") {
    image.src = snow;
  } else if (data === "wind") {
    image.src = wind;
  }
}

function formatTemperature(temp) {
  const convertedTemp =
    unit === "fahrenheit" ? (temp * 1.8 + 32).toFixed(1) : temp;
  const symbol = unit === "fahrenheit" ? "ºF" : "ºC";
  return `${convertedTemp} ${symbol}`;
}

function populateLocationDescription(data) {
  if (!data) return;
  local.textContent = data.resolvedAddress;
  localDesc.textContent = data.description;
}

function render(data) {
  generateForecast(data);
  generateFullDayForecast(data);
  generateWeatherDetails(data);
  populateDetailedStatus(data);
  populateLocationDescription(data);
  populateOverallStatus(data);
}

export default render;
