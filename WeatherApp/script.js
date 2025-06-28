const apiKey = "3a2a612d63c1fac4f1909b0c36095b71";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const weatherDiv = document.querySelector(".weather");
const message = document.createElement("p");
message.style.textAlign = "center";
message.style.marginTop = "10px";
message.style.fontWeight = "bold";

async function checkWeather(city) {
    message.textContent = "Loading...";
    message.style.color = "black";
    weatherDiv.appendChild(message);
    try
    {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }
        
        const data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        if(data.weather[0].main=="Clouds"){
            weatherIcon.src = "clouds.png"
        }
        else if(data.weather[0].main=="Clear"){
            weatherIcon.src = "clear.png"
        }
        else if(data.weather[0].main=="Rain"){
            weatherIcon.src = "rain.png"
        }
        else if(data.weather[0].main=="Drizzle"){
            weatherIcon.src = "drizzle.png"
        }
        else if(data.weather[0].main=="Mist"){
            weatherIcon.src = "mist.png"
        }
        else if(data.weather[0].main=="Snow"){
            weatherIcon.src = "snow.png"
        }

        message.remove();
    }

    catch (error) {
        // Show error
        console.log("error");
        message.textContent = `❌ ${error.message}`;
        message.style.color = "red";

        //clear previous values
        document.querySelector(".city").innerHTML = "--";
        document.querySelector(".temp").innerHTML = "--°C";
        document.querySelector(".humidity").innerHTML = "--%";
        document.querySelector(".wind").innerHTML = "-- km/hr";
        weatherIcon.src = "";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

//This will trigger default load on refresh
window.addEventListener("load", () => {
    checkWeather("Ghaziabad");
});