const input = document.querySelector('.input');
const button = document.querySelector('.find');
const degreesElement = document.querySelector('.degrees');
const cityElement = document.querySelector('.city');
const windElement = document.querySelector('.wind span');
const humidityElement = document.querySelector('.humidity span');
const titleElement = document.querySelector('.title span')
const iconElement = document.querySelector('.weather-icon');
const geoButton = document.querySelector('.geo-btn');

const apiKey = '0d0d187621c9a9137b09cea6b35c2475';

async function  getWeather(cityName) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric&lang=ru`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === "404") {
            alert("Город не найден")
            input.value = ""
            return 
        }

        localStorage.setItem("lastCity", data.name);

        const roundedTemp = Math.round(data.main.temp);
        degreesElement.textContent = `${roundedTemp}°`;
        titleElement.textContent = data.name; 

        windElement.textContent = data.wind.speed;
        humidityElement.textContent = data.main.humidity

        const weatherType = data.weather[0].main

        if (weatherType === "Clear") {
            iconElement.textContent = "☀️";
        } else if (weatherType === "Clouds") {
            iconElement.textContent = "☁️";
        } else if (weatherType === "Rain" || weatherType === "Drizzle") {
            iconElement.textContent = "🌧️";
        } else if (weatherType === "Snow") {
            iconElement.textContent = "❄️";
        } else {
            iconElement.textContent = "🌫️"; 
        }

        if (roundedTemp < 0) {
            document.body.style.backgroundColor = "#bbdefb"
        } else if(roundedTemp >= 0 && roundedTemp <= 20) {
            document.body.style.backgroundColor = "#e8f5e9"
        } else {
            document.body.style.backgroundColor = "#ffe0b2"
        }
        
        input.value = ""

        console.log(data);
    } catch (error) {
        console.log('Ошибка:', error)
    }
}

async function getWeatherByCoords(lat, lon) {
    try {
        
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru`;

        const response = await fetch(url);
        const data = await response.json();

        const weatherType = data.weather[0].main;
        const roundedTemp = Math.round(data.main.temp);

        degreesElement.textContent = `${roundedTemp}°`;
        titleElement.textContent = data.name; 
        windElement.textContent = data.wind.speed;
        humidityElement.textContent = data.main.humidity;
        
        localStorage.setItem("lastCity", data.name);

        if (weatherType === "Clear") {
            iconElement.textContent = "☀️";
        } else if (weatherType === "Clouds") {
            iconElement.textContent = "☁️";
        } else if (weatherType === "Rain" || weatherType === "Drizzle") {
            iconElement.textContent = "🌧️";
        } else if (weatherType === "Snow") {
            iconElement.textContent = "❄️";
        } else {
            iconElement.textContent = "🌫️"; 
        }
        if (roundedTemp < 0) {
            document.body.style.backgroundColor = "#bbdefb";
        } else if(roundedTemp >= 0 && roundedTemp <= 20) {
            document.body.style.backgroundColor = "#e8f5e9";
        } else {
            document.body.style.backgroundColor = "#ffe0b2";
        }

        console.log("Данные по геолокации:", data);
    } catch (error) {
        console.log('Ошибка геолокации:', error);
    }
}

async function getWeatherByCoords(lat, lon) {
    try {
        
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ru`;

        const response = await fetch(url);
        const data = await response.json();

        const weatherType = data.weather[0].main;
        const roundedTemp = Math.round(data.main.temp);

        degreesElement.textContent = `${roundedTemp}°`;
        titleElement.textContent = data.name; 
        windElement.textContent = data.wind.speed;
        humidityElement.textContent = data.main.humidity;
        
        localStorage.setItem("lastCity", data.name);

        if (weatherType === "Clear") {
            iconElement.textContent = "☀️";
        } else if (weatherType === "Clouds") {
            iconElement.textContent = "☁️";
        } else if (weatherType === "Rain" || weatherType === "Drizzle") {
            iconElement.textContent = "🌧️";
        } else if (weatherType === "Snow") {
            iconElement.textContent = "❄️";
        } else {
            iconElement.textContent = "🌫️"; 
        }
        if (roundedTemp < 0) {
            document.body.style.backgroundColor = "#bbdefb";
        } else if(roundedTemp >= 0 && roundedTemp <= 20) {
            document.body.style.backgroundColor = "#e8f5e9";
        } else {
            document.body.style.backgroundColor = "#ffe0b2";
        }

        console.log("Данные по геолокации:", data);
    } catch (error) {
        console.log('Ошибка геолокации:', error);
    }
}

geoButton.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                getWeatherByCoords(lat, lon);
            },
            (error) => {
                console.log('Ошибка доступа к геолокации:', error);
                alert('Не удалось получить геолокацию');
            }
        );
    } else {
        alert('Геолокация не поддерживается');
    }
});

button.addEventListener("click", () => {
    const cityName = input.value.trim();
    if (cityName) {
        getWeather(cityName);
    }
})

const savedCity = localStorage.getItem("lastCity");

if (savedCity) {
    getWeather(savedCity)
}

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cityName = input.value.trim();
        if (cityName) {
            getWeather(cityName);
        }
    }
});