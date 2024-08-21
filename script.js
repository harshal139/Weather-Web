const apiKey = '4acc6c6056msh1bdbb438dd5fc4bp16fa87jsnf6ba595f9480';
const apiHost = 'open-weather13.p.rapidapi.com';

document.getElementById('getWeather').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    if (city) {
        await fetchWeather(city);
    } else {
        document.getElementById('weatherInfo').innerHTML = 'Please enter a city name.';
    }
});

async function fetchWeather(city) {
    const url = `https://${apiHost}/city/${encodeURIComponent(city)}/EN`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': apiHost
        }
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json(); // Parse JSON response
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weatherInfo').innerHTML = 'Error fetching weather data.';
    }
}

function displayWeather(data) {
    if (data && data.weather && data.weather[0]) {
        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const city = data.name;
        const country = data.sys.country;

        document.getElementById('weatherInfo').innerHTML = `
            <h2>Weather in ${city}, ${country}</h2>
            <p>Temperature: ${temperature}°C</p>
            <p>Condition: ${weatherDescription}</p>
        `;
    } else {
        document.getElementById('weatherInfo').innerHTML = 'Weather data not available.';
    }
}
