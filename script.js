class WeatherApp {
    constructor() {
        this.input = document.querySelector('.input');
        this.button = document.querySelector('.find');
        this.degreesElement = document.querySelector('.degrees');
        this.cityElement = document.querySelector('.city');
        this.windElement = document.querySelector('.wind span');
        this.humidityElement = document.querySelector('.humidity span');
        this.titleElement = document.querySelector('.title span');
        this.iconElement = document.querySelector('.weather-icon');
        this.geoButton = document.querySelector('.geo-btn');
        this.apiKey = '0d0d187621c9a9137b09cea6b35c2475';
    }

    updateUI(data) {
        const weatherType = data.weather[0].main;
        const roundedTemp = Math.round(data.main.temp);

        this.degreesElement.textContent = `${roundedTemp}°`;
        this.titleElement.textContent = data.name; 
        this.windElement.textContent = data.wind.speed;
        this.humidityElement.textContent = data.main.humidity;

        localStorage.setItem("lastCity", data.name);

        if (weatherType === "Clear") {
            this.iconElement.textContent = "☀️";
        } else if (weatherType === "Clouds") {
            this.iconElement.textContent = "☁️";
        } else if (weatherType === "Rain") {
            this.iconElement.textContent = "🌧️";
        } else if (weatherType === "Snow") {
            this.iconElement.textContent = "❄️";
        }

        if (roundedTemp < 0) document.body.style.backgroundColor = "#bbdefb";
        else if (roundedTemp >= 0 && roundedTemp <= 20) document.body.style.backgroundColor = "#e8f5e9";
        else document.body.style.backgroundColor = "#ffe0b2";
        
        this.input.value = ""
    }

    async getWeather(cityName) {
        try {   
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.apiKey}&units=metric&lang=ru`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.cod === "404") {
                alert("Город не найден")
                this.input.value = ""
                return 
            }

            this.updateUI(data)
        } catch (error) {
            console.log("Ошибка", error)
        }
    }

    async getWeatherByCoords(lat, lon) {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric&lang=ru`
            const response = await fetch(url);
            const data = await response.json();

            this.updateUI(data); 
        } catch (error) {
            console.log("Ошибка по геолокации", error);
        }    

    }

    init() {
        this.button.addEventListener("click", () => {
            const cityName = this.input.value.trim();
            if (cityName) this.getWeather(cityName)
        })

        this.input.addEventListener("keydown", (even) => {
            if (even.key === "Enter") {
                const cityName = this.input.value.trim();
                if (cityName) this.getWeather(cityName)
            }
        })

         this.geoButton.addEventListener('click', () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const lat = position.coords.latitude;
                        const lon = position.coords.longitude;
                        this.getWeatherByCoords(lat, lon); 
                    },
                    (error) => alert('Не удалось получить геолокацию')
                );
            } else {
                alert('Геолокация не поддерживается');
            }
        });

        const savedCity = localStorage.getItem("lastCity");
        if (savedCity) {
            this.getWeather(savedCity);
        }
    }
}
 
const app = new WeatherApp();
app.init();