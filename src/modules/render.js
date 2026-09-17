import { parse, format } from "date-fns";
import { getState } from "./app.js";

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
const currentUnitP = document.querySelector(".current-unit-p");
const pageContent = document.querySelector(".page-content");
const introMessage = document.querySelector(".intro-message");

const iconNames = {
  "clear-day": "clear-day.png",
  "clear-night": "clear-night.png",
  cloudy: "cloudy.png",
  fog: "fog.png",
  "partly-cloudy-day": "partly-cloudy-day.png",
  "partly-cloudy-night": "partly-cloudy-night.png",
  rain: "rain.png",
  snow: "snow.png",
  wind: "wind.png",
};

async function retrieveIcon(iconName, image) {
  const icon = await import(`../assets/images/${iconName}`);
  image.src = icon.default;
}

function getIcon(name, image) {
  retrieveIcon(iconNames[name], image);
}

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

function formatTemperature(temp) {
  const convertedTemp =
    getState().unit === "fahrenheit" ? +(temp * 1.8 + 32).toFixed(1) : temp;
  const symbol = getState().unit === "fahrenheit" ? "ºF" : "ºC";
  return `${convertedTemp} ${symbol}`;
}

function populateLocationDescription(data) {
  if (!data) return;
  local.textContent = data.resolvedAddress;
  localDesc.textContent = data.description;
}

function updateCurrentUnit(unit) {
  currentUnitP.textContent = `Current unit: ${unit.charAt(0).toUpperCase(1) + unit.slice(1)} `;
}

function render(data) {
  if (data === undefined) {
    pageContent.style.display = "none";
    introMessage.textContent = "Search for a city to get started";
    return;
  }
  introMessage.textContent = "";
  pageContent.style.display = "block";
  generateForecast(data);
  generateFullDayForecast(data);
  generateWeatherDetails(data);
  populateDetailedStatus(data);
  populateLocationDescription(data);
  populateOverallStatus(data);
}

export { render, updateCurrentUnit };
