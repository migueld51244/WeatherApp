import "./style.css";
import { parse, format } from "date-fns";
import  render  from "./modules/render.js";

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

const fullDayWrapper = document.querySelector(".full-day-wrapper");



let data;
export let unit = "celsius";

function getLocation() {
  const location = locationInput.value;
  return encodeURIComponent(location);
}

searchButton.addEventListener("click", async () => {
  const location = getLocation();
  data = await getLocationData(location);
  render(data);
});

switchUnitBtn.addEventListener("click", (e) => {
  switchUnits();
});

async function getLocationData(location) {
  errorMessage.textContent = "";
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=3C2DHMPPBS5NBWY7NCA4C7LTT&unitGroup=metric`,
    );
    if (!response.ok) {
      errorMessage.textContent = "Location not found";
      throw new Error("Unable to fetch location data");
    }
    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.error(error);
  }
}



function switchUnits() {
  unit = unit === "celsius" ? "fahrenheit" : "celsius";
  render(data);
}


