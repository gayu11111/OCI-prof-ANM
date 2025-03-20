// Your OpenWeatherMap API key (replace with your own key)
const apiKey = 'YOUR_API_KEY'; 

// Elements
const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherDisplay = document.getElementById('weather-display');

// Event listener for button click
getWeatherBtn.addEventListener('click', getWeather);

// Function to get weather data
async function getWeather() {
    const cityName = cityInput.value.trim();

    if (!cityName) {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            alert("City not found.");
            return;
        }

        // Destructure the weather data
        const { name, main, weather, wind } = data;
        const temperature = main.temp;
        const humidity = main.humidity;
        const description = weather[0].description;
        const windSpeed = wind.speed;

        // Display the weather data
        weatherDisplay.innerHTML = `
            <h2>${name}</h2>
            <p><strong>Temperature:</strong> ${temperature}°C</p>
            <p><strong>Weather:</strong> ${description}</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
        `;
    } catch (error) {
        alert("Error fetching weather data.");
    }
}
