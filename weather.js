document.addEventListener("DOMContentLoaded", function () {
  function getCurrentDateTime() {
    const now = new Date();
    const days = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
    ];
    const day = days[now.getDay()];
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${day} ${hours}:${minutes}`;
  }

  function updateCityName(cityName) {
    const cityElement = document.querySelector(".current-city");
    cityElement.textContent = cityName;
  }

  function updateDateTime(dateTime) {
    const dateTimeElement = document.querySelector(".current-date-time");
    dateTimeElement.textContent = dateTime;
  }

  function updateWeather(weatherData) {
    const weatherElement = document.querySelector(".current-details");
    const weatherIcon = document.querySelector(".weather-icon");
    const temperatureElement = document.querySelector(".current-temperature-value");

    const weatherDescription = weatherData.current.condition.text;
    const temperature = Math.round(weatherData.current.temp_c);
    const humidity = weatherData.current.humidity;
    const windSpeed = weatherData.current.wind_kph;
    const iconCode = weatherData.current.condition.icon;

    weatherElement.innerHTML = `${weatherDescription} <br> Humidity: <strong>${humidity}%</strong>, Wind: <strong>${windSpeed} km/h</strong>`;
    temperatureElement.textContent = `${temperature}°C`;
    weatherIcon.src = `https:${iconCode}`;
  }

  async function fetchWeather(cityName) {
    const apiKey = '05370a00c38b43e3aab5b1b184b7f13c';
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.error) {
        alert("City not found!");
      } else {
        updateWeather(data);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const cityInput = document.getElementById("city-input");
    const cityName = cityInput.value.trim();

    if (cityName) {
      updateCityName(cityName);
      updateDateTime(getCurrentDateTime());
      fetchWeather(cityName);
      cityInput.value = "";
    }
  }

  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", handleFormSubmit);

  updateDateTime(getCurrentDateTime());
});
