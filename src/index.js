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

function displayTemperature(response) {
    //   console.log(response.data.temperature.current);
    let tempElement = document.querySelector("#temp");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let iconElement = document.querySelector("#icon");
    let humidityElement = document.querySelector("#humidElement");
    let windElement = document.querySelector("#windSpeed");
    let dateElement = document.querySelector("#date");
    
    tempElement.innerHTML = Math.round(response.data.temperature.current);
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
}

let apiKey = "5acaob54d1tff787538b50f02534ee0a";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Seoul&key=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);
