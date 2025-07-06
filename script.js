const apiKey = "f213a38e01214d072cc424a4ce8f8f67";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?id={city id}&appid={API key}";
const exUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=London&appid=f213a38e01214d072cc424a4ce8f8f67&units=metric";
const windSpeed = document.querySelector(".wind");
const tempData = document.querySelector("#temp");
const humidityData = document.querySelector(".humidity");
const cityData = document.querySelector("#city_name");
const watherPng = document.querySelector("#weImg");
const cardOutPut = document.querySelector(".weather_card");
const error_output = document.querySelector(".error_output");
const cityName = document.querySelector("#city_name_input");
const searchBtn = document.querySelector(".search_bar");

async function getWeatherData(cityInput) {
  const data = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`
  );
  console.log(data.status);
  if (data.status === 404) {
    cardOutPut.style.display = "none";
    error_output.innerHTML = `<h3>You entered a wrong city name</h3>`;
  } else {
    const weatherData = await data.json();
    error_output.innerHTML = `<h3></h3>`;
    if (weatherData.weather[0].main == "Clear") {
      watherPng.src = "images/clear.png";
    } else if (weatherData.weather[0].main == "Clouds") {
      watherPng.src = "images/clouds.png";
    } else if (weatherData.weather[0].main == "Drizzle") {
      watherPng.src = "images/drizzle.png";
    } else if (weatherData.weather[0].main == "Mist") {
      watherPng.src = "images/mist.png";
    } else if (weatherData.weather[0].main == "Rain") {
      watherPng.src = "images/rain.png";
    } else if (weatherData.weather[0].main == "Snow") {
      watherPng.src = "images/snow.png";
    } else if (weatherData.weather[0].main == "Haze") {
      watherPng.src = "images/mist.png";
    } else {
      watherPng.src = "images/all.jpeg";
    }
    windSpeed.innerHTML = `<i class="ri-windy-fill"></i><h2>${weatherData.wind.speed} Km/h</h2>`;
    tempData.innerHTML = `<h1>${Math.floor(weatherData.main.temp)}°C</h1>`;
    humidityData.innerHTML = `<img src="images/humidity.png" alt="" /><h2>${weatherData.main.humidity} %</h2>`;
    cityData.innerHTML = ` <h1>${weatherData.name}</h1>`;
    cardOutPut.style.display = "block";
  }
}
searchBtn.addEventListener("click", () => {
  getWeatherData(cityName.value);
  cityName.value = null;
});