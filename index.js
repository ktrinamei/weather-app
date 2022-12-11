// CURRENT DATE AND TIME
let now = new Date();
let currentDate = document.querySelector(".date");

let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];

currentDate.innerHTML = `${day}, ${date} ${month}, ${year} ${hours}:${minutes}`;

// FORECAST

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
          <img class="forecast-icon"
            src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="40"
          />
          <div class="week-forecast-temp">
            <span class="wf-max"> ${Math.round(forecastDay.temp.max)}°</span>
            <span class="wf-min"> ${Math.round(forecastDay.temp.min)}°</span>
          </div>
        </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// CITY SEARCH COORDS
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5201594abea9f3e38b70e65b11a80c24";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

// CITY SEARCH
function citySearch(event) {
  let apiKey = "5201594abea9f3e38b70e65b11a80c24";
  let city = document.querySelector("#search-input").value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input").value;
  citySearch(searchInput);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

// CURRENT TEMPERATURE
function showTemperature(response) {
  console.log(response.data);

  let cityInput = document.querySelector(".city");
  cityInput.innerHTML = response.data.name;

  let temperature = Math.round(celsiusTemp);
  let cityTemperature = document.querySelector(".current-temp");
  cityTemperature.innerHTML = Math.round(response.data.main.temp);

  // EXTRA INFO DATA
  let highTemperature = document.querySelector(".current-high-temp");
  highTemperature.innerHTML = `High ${Math.round(
    response.data.main.temp_max
  )}°C |`;

  celsiusTemp = response.data.main.temp;

  let lowTemperature = document.querySelector(".current-low-temp");
  lowTemperature.innerHTML = `Low ${Math.round(response.data.main.temp_min)}°C`;

  let description = document.querySelector("#temp-description");
  description.innerHTML = response.data.weather[0].description;

  let windSpeed = document.querySelector("#wind-value");
  windSpeed.innerHTML = `Wind | ${Math.round(response.data.wind.speed)} MPH`;

  let humidityPercentage = document.querySelector("#humidity-value");
  humidityPercentage.innerHTML = `Humidity | ${response.data.main.humidity} %`;

  let tempIcon = document.querySelector("#icon");
  tempIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  tempIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let cityTemperature = document.querySelector(".current-temp");
  cityTemperature.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

// GEO-LOCATION BUTTON
function searchLocation(position) {
  let apiKey = "5201594abea9f3e38b70e65b11a80c24";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showTemperature);
}

function currentGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let geoLocationButton = document.querySelector("#geo-location");
geoLocationButton.addEventListener("click", currentGeoLocation);
