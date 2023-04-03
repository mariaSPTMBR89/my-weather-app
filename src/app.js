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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-3 day">
            <div class="row">
              <div class="col-6">
                <img src="media/fewclouds.svg" alt="cloudy" class="thumbnail" />
              </div>
              <div class="col-6">
                <h3 class="thumbnail-headline">${formatDay(forecastDay.dt)}</h3>
                <div class="forecast-range">
                <span class="forecast-min"> ${Math.round(
                  forecastDay.temp.min
                )}° / </span> 
                <span class="forecast-max"> ${Math.round(
                  forecastDay.temp.max
                )}° </span>
                </div>
              </div>
            </div>
          </div>
    `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "5354b60afda2b7800186c06153932396";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector(".search input");

  let apiKey = "f3009e4852fa0a079dab291dabf020c4";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

  function showWeather(response) {
    console.log(response.data);
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector(".current-temperature");
    temperatureElement.innerHTML = `${temperature}`;

    celciusTemperature = Math.round(response.data.main.temp);

    let cityName = response.data.name;
    let city = document.querySelector("h1");
    city.innerHTML = cityName;

    let minTemperature = Math.round(response.data.main.temp_min);
    let minTemperatureElement = document.querySelector("#minimum");
    minTemperatureElement.innerHTML = `${minTemperature}`;

    let maxTemperature = Math.round(response.data.main.temp_max);
    let maxTemperatureElement = document.querySelector("#maximum");
    maxTemperatureElement.innerHTML = `${maxTemperature}`;

    let description = response.data.weather[0].description;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = description;
    let illuCode = response.data.weather[0].main;
    let weatherIllustration = document.querySelector("#weatherIllu");
    if (illuCode === "Clear") {
      weatherIllustration.setAttribute("src", "media/clearsky.svg");
    }
    if (illuCode === "Drizzle") {
      weatherIllustration.setAttribute("src", "media/fewclouds.svg");
    }
    if (illuCode === "Clouds") {
      weatherIllustration.setAttribute("src", "media/cloudy.svg");
    }
    if (illuCode === "Fog") {
      weatherIllustration.setAttribute("src", "media/brokenclouds.svg");
    }
    if (illuCode === "Rain") {
      weatherIllustration.setAttribute("src", "media/showerrain.svg");
    }
    if (illuCode === "Drizzle") {
      weatherIllustration.setAttribute("src", "media/rain.svg");
    }
    if (illuCode === "Thunderstorm") {
      weatherIllustration.setAttribute("src", "media/brokenclouds.svg");
    }
    if (illuCode === "Snow") {
      weatherIllustration.setAttribute("src", "media/mist.svg");
    }
    if (illuCode === "Mist") {
      weatherIllustration.setAttribute("src", "media/mist.svg");
    }
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

    getForecast(response.data.coord);
  }
  axios
    .get(`${apiUrl}${searchInput.value}&units=metric&appid=${apiKey}`)
    .then(showWeather);
}

function showCurrentTemperature(response) {
  let temperatureLocation = Math.round(response.data.main.temp);
  let temperatureLocationElement = document.querySelector(
    ".current-temperature"
  );
  temperatureLocationElement.innerHTML = `${temperatureLocation}°C`;

  function showPosition(position) {
    let lat = position.coord.latitude;
    let lon = position.coord.longitude;
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

let searchForm = document.querySelector(".search");
searchForm.addEventListener("submit", searchCity);
