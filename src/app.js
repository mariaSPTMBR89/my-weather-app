function formatTime(time) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[time.getDay()];
  let hour = time.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = time.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  let formattedTime = `${day} ${hour}:${minute}`;
  return formattedTime;
}

let time = document.querySelector("#time");
time.innerHTML = formatTime(new Date());

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search input");

  let apiKey = "f3009e4852fa0a079dab291dabf020c4";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

  function showWeather(response) {
    console.log(response.data);
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector(".current-temperature");
    temperatureElement.innerHTML = `${temperature}°`;

    let cityName = response.data.name;
    let city = document.querySelector("h1");
    city.innerHTML = cityName;

    let minTemperature = Math.round(response.data.main.temp_min);
    let minTemperatureElement = document.querySelector("#minimum");
    minTemperatureElement.innerHTML = `${minTemperature}°`;

    let maxTemperature = Math.round(response.data.main.temp_max);
    let maxTemperatureElement = document.querySelector("#maximum");
    maxTemperatureElement.innerHTML = `${maxTemperature}°`;

    let description = response.data.weather[0].description;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = description;

    let windSpeed = Math.round(response.data.wind.speed);
    let windSpeed00 = document.querySelector("#windSpeed00");
    windSpeed00.innerHTML = `${windSpeed}km/h`;
    let windSpeed06 = document.querySelector("#windSpeed06");
    windSpeed06.innerHTML = `${windSpeed * 2}km/h`;
    let windSpeed12 = document.querySelector("#windSpeed12");
    windSpeed12.innerHTML = `${windSpeed / 2}km/h`;
    let windSpeed18 = document.querySelector("#windSpeed18");
    windSpeed18.innerHTML = `${windSpeed}km/h`;
    let windSpeed24 = document.querySelector("#windSpeed24");
    windSpeed24.innerHTML = `${windSpeed * 2}km/h`;
  }

  axios
    .get(`${apiUrl}${searchInput.value}&units=metric&appid=${apiKey}`)
    .then(showWeather);
}
let searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", searchCity);

function showCurrentTemperature(response) {
  let temperatureLocation = Math.round(response.data.main.temp);
  let temperatureLocationElement = document.querySelector(
    ".current-temperature"
  );
  temperatureLocationElement.innerHTML = `${temperatureLocation}°C`;

  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "f3009e4852fa0a079dab291dabf020c4";
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
    axios
      .get(`${apiUrl}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
      .then(showCurrentTemperature);
  }

  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchLocation = document.querySelector("button.btn-outline-primary");
searchLocation.addEventListener("click", showCurrentTemperature);
