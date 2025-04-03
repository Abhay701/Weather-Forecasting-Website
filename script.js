
        const API_KEY = "65fe2bf569359682bd1f0c67dd203788";
        
        const cityInput = document.getElementById('city-input');
        const searchBtn = document.getElementById('search-btn');
        const errorMessage = document.getElementById('error-message');
        const weatherInfo = document.getElementById('weather-info');
        const loader = document.getElementById('loader');
        const cityName = document.getElementById('city-name');
        const dateTime = document.getElementById('date-time');
        const weatherIcon = document.getElementById('icon');
        const temperature = document.getElementById('temperature');
        const description = document.getElementById('description');
        const feelsLike = document.getElementById('feels-like');
        const humidity = document.getElementById('humidity');
        const windSpeed = document.getElementById('wind-speed');
        const pressure = document.getElementById('pressure');
        
        // Function to format date
        function formatDate(date) {
            const options = { 
                weekday: 'long', 
                hour: '2-digit', 
                minute: '2-digit'
            };
            return date.toLocaleDateString('en-US', options);
        }
        
        // Function to get weather data
        async function getWeather(city) {
            // Show loader and hide previous results
            loader.style.display = 'block';
            weatherInfo.style.display = 'none';
            errorMessage.style.display = 'none';
            
            try {
                const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
                const response = await fetch(apiUrl);
                
                if (!response.ok) {
                    throw new Error('City not found');
                }
                
                const data = await response.json();
                
                // Update UI with weather data
                cityName.textContent = `${data.name}, ${data.sys.country}`;
                dateTime.textContent = formatDate(new Date());
                
                weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
                temperature.textContent = `${Math.round(data.main.temp)}°C`;
                description.textContent = data.weather[0].description;
                
                feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
                humidity.textContent = `${data.main.humidity}%`;
                windSpeed.textContent = `${data.wind.speed} m/s`;
                pressure.textContent = `${data.main.pressure} hPa`;
                
                // Show weather info
                weatherInfo.style.display = 'block';
            } catch (error) {
                errorMessage.style.display = 'block';
            } finally {
                loader.style.display = 'none';
            }
        }
        
        // Event listeners
        searchBtn.addEventListener('click', () => {
            const city = cityInput.value.trim();
            if (city) {
                getWeather(city);
            }
        });
        
        cityInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const city = cityInput.value.trim();
                if (city) {
                    getWeather(city);
                }
            }
        });
        
        // Load default city on page load
        window.addEventListener('load', () => {
            getWeather('London');
        });