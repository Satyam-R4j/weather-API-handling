document.addEventListener("DOMContentLoaded", () =>
{

    const cityInput = document.getElementById('city-input')
    const getWeatherBtn = document.getElementById('get-weather-btn')
    const weatherInfo = document.getElementById('Weather-info')
    const cityName = document.getElementById('city-name')
    const temperature = document.getElementById('temperature')
    const description = document.getElementById('description')
    const errorMessage = document.getElementById('error-message')

    const API_KEY = "477c1836ff4cd438b413ad24c1234f6b"


    getWeatherBtn.addEventListener('click', async () =>
    {
        const city = cityInput.value.trim()
        if (!city) return

        try
        {
            const weatherData = await fetchWeatherData(city)
            displayWeatherData(weatherData)
        }
        catch
        {
            showError()
        }

    })


    async function fetchWeatherData(city)
    {
        //gets the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

        const response = await fetch(url)
        console.log(typeof response);
        console.log(response);

        if (!response.ok)
        {
            throw new Error("City not found!")
        }

        const data = await response.json()
        return data
    }

    function displayWeatherData(data)
    {
        //display
        const {name, main, weather} = data
        cityName.textContent = name
        temperature.textContent = `Temperature : ${main.temp}`
        description.textContent = `Weather : ${weather[0].description}`

        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add('hidden')

    }

    function showError()
    {
        weatherInfo.classList.remove('hidden')
        errorMessage.classList.add('hidden')
    }

})