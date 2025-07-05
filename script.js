const API_KEY = 'e849e08df98f22e2bd5f2fdb201f1127';

function getWeather() {
  const city = document.getElementById("locationInput").value.trim();
  if (!city) return alert("Please enter a city name.");
  fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
}

function getWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`);
    }, () => {
      alert("Location access denied.");
    });
  } else {
    alert("Geolocation not supported.");
  }
}

function fetchWeatherData(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => displayWeather(data))
    .catch(() => alert("Could not fetch weather data."));
}

function displayWeather(data) {
  if (!data || !data.main) {
    document.getElementById("weatherInfo").innerHTML = "<p>City not found.</p>";
    return;
  }

  const icon = getWeatherIcon(data.weather[0].main);
  const html = `
    <img src="images/${icon}" alt="${data.weather[0].main}">
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>${data.weather[0].main}</strong> - ${data.weather[0].description}</p>
    <p>🌡 Temperature: ${data.main.temp}°C (Feels like ${data.main.feels_like}°C)</p>
    <p>💧 Humidity: ${data.main.humidity}%</p>
    <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
    <p>📊 Pressure: ${data.main.pressure} hPa</p>
  `;
  document.getElementById("weatherInfo").innerHTML = html;
}

function getWeatherIcon(condition) {
  switch (condition.toLowerCase()) {
    case "clear": return "sunny.png";
    case "clouds": return "cloudy.png";
    case "rain": return "rainy.png";
    case "snow": return "snow.png";
    case "thunderstorm": return "storm.png";
    default: return "cloudy.png";
  }
}
