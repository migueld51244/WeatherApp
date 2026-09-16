import { render, updateCurrentUnit } from "../modules/render.js";

const locationInput = document.querySelector("#search-local");
const switchUnitBtn = document.querySelector("button.unit-switcher-btn");
const loadingTemplate = document.querySelector(".loading-screen-template");
const searchButton = document.querySelector(".search-location-btn");
const errorMessage = document.querySelector(".error-message");

// Control current weather data and unit
const state = {
  data: undefined,
  unit: "celsius",
};

export function getState() {
  return state;
}

function getLocation() {
  const location = locationInput.value;
  return encodeURIComponent(location);
}

async function getLocationData(location) {
  // Hide message to clear previous errors
  errorMessage.style.display = "none";
  errorMessage.textContent = "";
  // Display loading animation
  const loadingScreen = loadingTemplate.content.cloneNode(true);
  document.body.append(loadingScreen);
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=3C2DHMPPBS5NBWY7NCA4C7LTT&unitGroup=metric`,
    );
    if (!response.ok) {
      errorMessage.style.display = "block";
      errorMessage.textContent = "Location not found";
      throw new Error("Unable to fetch location data");
    }
    const weatherData = await response.json();
    console.log(weatherData);
    return weatherData;
  } catch (error) {
    console.error(error);
  } finally {
    document.querySelector(".loading-screen-container").remove();
  }
}

function checkLocationInput() {
  if (locationInput.validity.valueMissing) {
    locationInput.setCustomValidity("What's the location?");
    return false;
  }
  locationInput.setCustomValidity("");
  return true;
}

function switchUnits() {
  getState().unit = state.unit === "celsius" ? "fahrenheit" : "celsius";
  render(getState().data);
}

export function initApp() {
  searchButton.addEventListener("click", async (e) => {
    if (!checkLocationInput()) {
      locationInput.reportValidity();
      e.preventDefault();
      return;
    }

    e.preventDefault();

    const location = getLocation();
    getState().data = await getLocationData(location);
    render(getState().data);
  });

  locationInput.addEventListener("keydown", async (e) => {
    if (e.key !== "Enter") return;
    if (!checkLocationInput()) {
      locationInput.reportValidity();
      e.preventDefault();
      return;
    }

    e.preventDefault();

    const location = getLocation();
    getState().data = await getLocationData(location);
    render(getState().data);
  });

  locationInput.addEventListener("input", () => {
    checkLocationInput();
  });

  switchUnitBtn.addEventListener("click", (e) => {
    switchUnits();
    updateCurrentUnit(getState().unit);
  });
}
