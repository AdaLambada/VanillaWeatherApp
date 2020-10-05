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

function showWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temp");
  currentTemperature.innerHTML = `${temperature}°C`;
  let currentCity = document.querySelector("h2");
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
  iconELement.setAttribute(
    "alt",
    `http://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`
  );
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "e38fef9e5177e1785bd20f248f3480f4";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let needleButton = document.querySelector("#loc-now");
needleButton.addEventListener("click", getCurrentPosition);

function search(city) {
  let apiKey = "e38fef9e5177e1785bd20f248f3480f4";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
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
  let apiKey = "e38fef9e5177e1785bd20f248f3480f4";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}

let form = document.querySelector("#city-search");
form.addEventListener("submit", handleSubmit);

search("New York");
