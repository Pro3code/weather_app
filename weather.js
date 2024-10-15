document.addEventListener("DOMContentLoaded", function () {
  function getCurrentDateTime() {
    const now = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
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
  function handleFormSubmit(event) {
    event.preventDefault();
    const cityInput = document.getElementById("city-input");
    const cityName = cityInput.value.trim();

    console.log("City input value:", cityName);
    if (cityName) {
      updateCityName(cityName);
      updateDateTime("Tuesday 16:00");
      cityInput.value = "";
    }
  }
  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", handleFormSubmit);
  updateDateTime(getCurrentDateTime());

  console.log("Event listener added to form");
});