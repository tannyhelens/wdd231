const apiKey = "ffe28dd3e52b42b3e837ea3a1ca711fc";
console.log("API key length:", apiKey.length);
console.log("API key:", apiKey);

const lat = -22.9068;
const lon = -43.1729;

const currentURL =
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const forecastURL =
  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

const currentTemp = document.querySelector("#current-temp");
const weatherDescription = document.querySelector("#weather-description");
const weatherIcon = document.querySelector("#weather-icon");
const forecastContainer = document.querySelector("#forecast-container");

async function getWeather() {
  try {
    const currentResponse = await fetch(currentURL);

    if (!currentResponse.ok) {
      throw new Error(
        `Current weather error: ${currentResponse.status}`
      );
    }

    const currentData = await currentResponse.json();

    currentTemp.textContent = Math.round(currentData.main.temp);

    weatherDescription.textContent =
      currentData.weather[0].description;

    weatherIcon.src =
      `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;

    weatherIcon.alt = currentData.weather[0].description;

    const forecastResponse = await fetch(forecastURL);

    if (!forecastResponse.ok) {
      throw new Error(
        `Forecast error: ${forecastResponse.status}`
      );
    }

    const forecastData = await forecastResponse.json();

    forecastContainer.innerHTML = "";

    const dailyForecast = forecastData.list.filter((item) =>
      item.dt_txt.includes("12:00:00")
    );

    dailyForecast.slice(0, 3).forEach((day) => {
      const date = new Date(day.dt_txt);

      const forecastCard = document.createElement("div");
      forecastCard.classList.add("forecast-card");

      forecastCard.innerHTML = `
        <h4>
          ${date.toLocaleDateString("en-US", {
            weekday: "long"
          })}
        </h4>
        <p>${Math.round(day.main.temp)}°C</p>
      `;

      forecastContainer.appendChild(forecastCard);
    });
  } catch (error) {
    console.error(error);

    weatherDescription.textContent =
      "Weather information is temporarily unavailable.";

    forecastContainer.innerHTML =
      "<p>Forecast information is temporarily unavailable.</p>";
  }
}

getWeather();