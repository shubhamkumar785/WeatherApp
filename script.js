const apiKey = "5c1a587b230a498683e55236252105";

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  // Request air quality data by adding aqi=yes
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city)}&aqi=yes`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("City not found or API key is incorrect");
    }

    const data = await response.json();

    // Update UI elements
    document.getElementById("temperature").textContent = `${data.current.temp_c}°C`;
    document.getElementById("location").textContent = `${data.location.name}, ${data.location.country}`;
    document.getElementById("icon").src = data.current.condition.icon;
    document.getElementById("description").textContent = data.current.condition.text;
    document.getElementById("humidity").textContent = `${data.current.humidity}%`;
    document.getElementById("wind").textContent = `${data.current.wind_kph} kph`;

    // Air quality index (PM2.5) — check if data exists
    if (data.current.air_quality && data.current.air_quality.pm2_5 !== undefined) {
      document.getElementById("airQuality").textContent = data.current.air_quality.pm2_5.toFixed(1);
    } else {
      document.getElementById("airQuality").textContent = "N/A";
    }

    // Clear input box
    document.getElementById("cityInput").value = "";
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
}
