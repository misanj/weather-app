function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10){
    hours = `0${hours}`;
  }
  
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  
  let days = [
    'Sunday', 
    'Monday', 
    'Tuesday', 
    'Wednesday', 
    'Thursday', 
    'Friday', 
    'Saturday'
  ];
  
  let day = days[date.getDay()];
  return `${day} ${hours}: ${minutes}`;
}

function getForcast(coord){
  let apiKeys = "5acaob54d1tff787538b50f02534ee0a";
  apiUrls = `https://api.shecodes.io/weather/v1/forecast?lon=${coord.longitude}&lat=${coord.latitude}&key=${apiKeys}&units=metric`;
  axios.get(apiUrls).then(displayWeatherForecast);
}

function displayTemperature(response) {
  let tempElement = document.querySelector("#temp");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let humidityElement = document.querySelector("#humidElement");
  let windElement = document.querySelector("#windSpeed");
  let dateElement = document.querySelector("#date");
  
  celsiusTemp = response.data.temperature.current;
  tempElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  
  // Sets weather icon dynamically using the selected city's weather condition.
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
    
    iconElement.setAttribute(
      "alt",
      `${response.data.condition.description}`
      );
      
      humidityElement.innerHTML = response.data.temperature.humidity;
      windElement.innerHTML = Math.round(response.data.wind.speed);
      dateElement.innerHTML = formatDate(response.data.time * 1000);
      
      getForcast(response.data.coordinates);
    }
    
    function search(city){
      let apiKey = "5acaob54d1tff787538b50f02534ee0a";
      let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
      axios.get(apiUrl).then(displayTemperature);
    }
    
    function handleSubmit(event){
      event.preventDefault();
      let cityName = document.querySelector("#cityItem");
      search(cityName.value);
    }
    
    function displayFahrenheitTemp(event){
      event.preventDefault();
      let fahTemprature= document.querySelector("#temp");
      // Remove the active class from celsius link and adds it to the Fahrenheit link
      celsiusLink.classList.remove("active");
      fahrenheitLink.classList.add("active");
      let fahrenheitConversionEle = (celsiusTemp * 9 ) / 5 + 32;
      fahTemprature.innerHTML = Math.round(fahrenheitConversionEle);
    }
    
    function displayCelsius(event) {
      event.preventDefault();
      // Remove the active class from Fahrenheit link and adds it to the celsius link
      fahrenheitLink.classList.remove("active");
      celsiusLink.classList.add("active");
      
      let celTemprature = document.querySelector("#temp");
      let fahrenheitTempEle = (celsiusTemp * 9) / 5 + 32;
      let celsiusConversionEle = ((fahrenheitTempEle - 32) * 5) / 9;
      celTemprature.innerHTML = Math.round(celsiusConversionEle);
    }
    
    function formatDay(timestamp){
      let date = new Date(timestamp * 1000);
      let day = date.getDay();
      let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      
      return days[day];
    }
    
    function displayWeatherForecast(response) {
      let forcast = response.data.daily;
      let weatherForecastElement = document.querySelector("#forecast")
      
      let forcastHTML = `<div class="row">`;
      
      forcast.forEach(function (forcastDay, index) {
        if(index < 6) {
          forcastHTML =
            forcastHTML +
            `
          <div class="col-2">
          <div class="weather-forcast-date days">
          ${formatDay(forcastDay.time)}
          </div>
          <img src= ${forcastDay.condition.icon_url} alt="img" class="weather-forcast-icon" />
          <div class="weather-forcast-temp">
          <span class="weather-forcast-temp-max">
          ${Math.round(forcastDay.temperature.maximum)}°
          </span> 
          <span class="weather-forcast-temp-min">
          ${Math.round(forcastDay.temperature.minimum)}°
          </span>
          </div>
          </div>
          `;
        }
      });
      forcastHTML = forcastHTML +`</div>`;
      weatherForecastElement.innerHTML = forcastHTML;
    }
    
    search("Lagos");
    
    let celsiusTemp = null;
    
    let form = document.querySelector("#search-form");
    form.addEventListener("submit", handleSubmit);
    
    let fahrenheitLink = document.querySelector("#fahrenheit");
    fahrenheitLink.addEventListener("click", displayFahrenheitTemp);
    
    let celsiusLink = document.querySelector("#celsuis-link");
    celsiusLink.addEventListener("click", displayCelsius);
