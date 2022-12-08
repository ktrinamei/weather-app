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

// CITY SEARCH
function citySearch(event) {
  let apiKey = "f5029b784306910c19746e40c14d6cd3";
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
  cityTemperature.innerHTML = `${temperature}`;

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
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let cityTemperature = document.querySelector(".current-temp");
  cityTemperature.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let cityTemperature = document.querySelector(".current-temp");
  cityTemperature.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

// GEO-LOCATION BUTTON
function searchLocation(position) {
  let apiKey = "f8e6a9e3d6fde87cb38868da460b1371";
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
