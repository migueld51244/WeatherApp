import "./style.css";

const locationInput = document.querySelector("#search-local");
const searchButton = document.querySelector(".search-location-btn");
const local = document.querySelector("p.local");
const localDesc = document.querySelector("p.local-desc");
const statusIcon = document.querySelector(".status-icon");

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

function getLocation() {
  const location = locationInput.value;
  return encodeURIComponent(location);
}

searchButton.addEventListener("click", () => {
  const location = getLocation();
  getLocationData(location);
});

async function getLocationData(location) {
  try {
    console.log("Loading");
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=3C2DHMPPBS5NBWY7NCA4C7LTT`,
    );
    const data = await response.json();
    console.log("Done!");
    console.log(data);
    local.textContent = data.address;
    localDesc.textContent = data.description;
    getIcon(data.currentConditions.icon);
    return data;
  } catch (error) {
    console.error(error);
  }
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
