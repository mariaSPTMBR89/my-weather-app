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

function displayCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search input");
  let city = document.querySelector("h1");
  city.innerHTML = searchInput.value;

  let apiKey = "f3009e4852fa0a079dab291dabf020c4";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector(".current-temperature");
    temperatureElement.innerHTML = `${temperature}°`;

    let minTemperature = Math.round(response.data.main.temp_min);
    let minTemperatureElement = document.querySelector(".range minimum");
    minTemperatureElement.innerHTML = `${minTemperature}°`;
  }

  axios
    .get(`${apiUrl}${searchInput.value}&units=metric&appid=${apiKey}`)
    .then(showTemperature);
}
let searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", displayCity);

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
