let now = new Date();
let dateToday = document.querySelector("#currentDayTime");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
dateToday.innerHTML = `${currentDay} ${currentHour}:${currentMinutes}`;

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temp");
  let currentCity = document.querySelector("h2");

  celciusTemperature = response.data.main.temp;

  currentTemperature.innerHTML = `${temperature}°C`;
  currentCity.innerHTML = response.data.name;
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#current-wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon-now");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "e38fef9e5177e1785bd20f248f3480f4";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);

  url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showForecast);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let needleButton = document.querySelector("#loc-now");
needleButton.addEventListener("click", getCurrentPosition);

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-2">
      <h1>
        ${formatHours(forecast.dt * 1000)}
      </h1>
      <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
      />
      <div class="real-feel-temp">
        <strong>
          ${Math.round(forecast.main.temp_max)}°
        </strong>/
        ${Math.round(forecast.main.temp_min)}°
      </div>
    </div>
  `;
  }
}

function search(city) {
  let apiKey = "e38fef9e5177e1785bd20f248f3480f4";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);

  url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#site-search").value;
  let locationInput = document.querySelector("h2");
  if (city) {
    locationInput.innerHTML = city;
  } else {
    alert("Where are you right now? Please enter a city!");
    locationInput.innerHTML = "anywhere";
  }
  search(city);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

function showFahrenheitTemperature(event) {
  event.preventDefault();

  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature) + "°F";
}

function showCelciusTemperature(event) {
  event.preventDefault();

  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celciusTemperature) + "°C";
}

let celciusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", showCelciusTemperature);

search("New York");
