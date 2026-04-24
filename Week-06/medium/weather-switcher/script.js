const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const statusText = document.getElementById("status");
const weatherContent = document.getElementById("weather-content");
const cityName = document.getElementById("city-name");
const conditionLabel = document.getElementById("condition-label");
const weatherIcon = document.getElementById("weather-icon");
const tempValue = document.getElementById("temp-value");
const windSpeed = document.getElementById("wind-speed");
const localTime = document.getElementById("local-time");
const overrideToggle = document.getElementById("override-toggle");
const overrideColor = document.getElementById("override-color");

const WEATHER_CODE_MAP = {
  0: { label: "Clear sky", icon: "☀️" },
  1: { label: "Mainly clear", icon: "🌤️" },
  2: { label: "Partly cloudy", icon: "⛅" },
  3: { label: "Overcast", icon: "☁️" },
  45: { label: "Fog", icon: "🌫️" },
  48: { label: "Rime fog", icon: "🌫️" },
  51: { label: "Light drizzle", icon: "🌦️" },
  53: { label: "Drizzle", icon: "🌦️" },
  55: { label: "Dense drizzle", icon: "🌧️" },
  61: { label: "Light rain", icon: "🌦️" },
  63: { label: "Rain", icon: "🌧️" },
  65: { label: "Heavy rain", icon: "🌧️" },
  71: { label: "Light snow", icon: "🌨️" },
  73: { label: "Snow", icon: "❄️" },
  75: { label: "Heavy snow", icon: "❄️" },
  80: { label: "Rain showers", icon: "🌦️" },
  81: { label: "Rain showers", icon: "🌧️" },
  82: { label: "Violent showers", icon: "🌧️" },
  95: { label: "Thunderstorm", icon: "⛈️" },
  96: { label: "Storm with hail", icon: "⛈️" },
  99: { label: "Heavy storm with hail", icon: "⛈️" },
};

const WEATHER_API_BASE = "https://api.open-meteo.com/v1/forecast";
const GEOCODE_API_BASE = "https://geocoding-api.open-meteo.com/v1/search";
let latestWeatherMeta = null;

function resolveTheme(weatherCode, isDay) {
  if (!isDay) {
    return "theme-clear-night";
  }

  if (weatherCode >= 95) {
    return "theme-storm";
  }

  if (weatherCode >= 71 && weatherCode <= 77) {
    return "theme-snow";
  }

  if ((weatherCode >= 51 && weatherCode <= 67) || (weatherCode >= 80 && weatherCode <= 82)) {
    return "theme-rainy";
  }

  if (weatherCode >= 1 && weatherCode <= 48) {
    return "theme-cloudy";
  }

  return "theme-clear-day";
}

function formatLocation(data) {
  const parts = [data.name, data.admin1, data.country].filter(Boolean);
  return parts.join(", ");
}

function setStatus(message, isError = false) {
  statusText.textContent = message;
  statusText.style.color = isError ? "#ffd7d7" : "var(--text-subtle)";
}

function applyTheme(themeClass) {
  const themeClasses = [
    "theme-clear-day",
    "theme-clear-night",
    "theme-cloudy",
    "theme-rainy",
    "theme-storm",
    "theme-snow",
    "theme-custom",
  ];

  document.body.classList.remove(...themeClasses);
  document.body.classList.add(themeClass);
}

function applyCustomBackground(hexColor) {
  document.body.style.setProperty("--bg-1", hexColor);
  document.body.style.setProperty("--bg-2", "#121721");
}

function resetAutoBackground() {
  document.body.style.removeProperty("--bg-1");
  document.body.style.removeProperty("--bg-2");
}

function updateThemeFromWeather(code, isDay) {
  if (overrideToggle.checked) {
    applyTheme("theme-custom");
    applyCustomBackground(overrideColor.value);
    return;
  }

  resetAutoBackground();
  applyTheme(resolveTheme(code, isDay));
}

async function fetchCoordinates(city) {
  const geocodeUrl = `${GEOCODE_API_BASE}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`;
  const geocodeResponse = await fetch(geocodeUrl);

  if (!geocodeResponse.ok) {
    throw new Error("Could not reach geocoding service.");
  }

  const geocodeData = await geocodeResponse.json();

  if (!geocodeData.results || geocodeData.results.length === 0) {
    throw new Error("City not found. Try another city name.");
  }

  return geocodeData.results[0];
}

async function fetchCurrentWeather(lat, lon) {
  const weatherUrl = `${WEATHER_API_BASE}?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day,wind_speed_10m&timezone=auto`;
  const weatherResponse = await fetch(weatherUrl);

  if (!weatherResponse.ok) {
    throw new Error("Could not reach weather service.");
  }

  const weatherData = await weatherResponse.json();

  if (!weatherData.current) {
    throw new Error("Weather data is incomplete right now.");
  }

  return weatherData;
}

function renderWeather(location, weatherData) {
  const current = weatherData.current;
  const weatherMeta = WEATHER_CODE_MAP[current.weather_code] || {
    label: "Unknown condition",
    icon: "🌍",
  };

  cityName.textContent = formatLocation(location);
  conditionLabel.textContent = weatherMeta.label;
  weatherIcon.textContent = weatherMeta.icon;
  tempValue.textContent = Math.round(current.temperature_2m);
  windSpeed.textContent = `${Math.round(current.wind_speed_10m)} km/h`;

  localTime.textContent = new Date(current.time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  latestWeatherMeta = {
    code: current.weather_code,
    isDay: current.is_day === 1,
  };

  weatherContent.classList.remove("hidden");
  setStatus("Updated just now.");
  updateThemeFromWeather(current.weather_code, current.is_day === 1);
}

async function handleWeatherSearch(event) {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (!city) {
    setStatus("Enter a city name first.", true);
    return;
  }

  setStatus("Loading weather data...");
  weatherContent.classList.add("hidden");

  try {
    const location = await fetchCoordinates(city);
    const weatherData = await fetchCurrentWeather(location.latitude, location.longitude);
    renderWeather(location, weatherData);
  } catch (error) {
    setStatus(error.message || "Something went wrong. Please retry.", true);
  }
}

overrideToggle.addEventListener("change", () => {
  overrideColor.disabled = !overrideToggle.checked;

  if (overrideToggle.checked) {
    applyTheme("theme-custom");
    applyCustomBackground(overrideColor.value);
    return;
  }

  resetAutoBackground();

  if (!latestWeatherMeta) {
    applyTheme("theme-clear-day");
    return;
  }

  applyTheme(resolveTheme(latestWeatherMeta.code, latestWeatherMeta.isDay));
});

overrideColor.addEventListener("input", () => {
  if (overrideToggle.checked) {
    applyCustomBackground(overrideColor.value);
  }
});

form.addEventListener("submit", handleWeatherSearch);

// Start with a meaningful default city.
cityInput.value = "Mumbai";
form.requestSubmit();
