function displayTemperature(response) {
    //   console.log(response.data.temperature.current);
    let tempElement = document.querySelector("#temp");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let iconElement = document.querySelector("#icon");
    let humidityElement = document.querySelector("#humidElement");
    let windElement = document.querySelector("#windSpeed");
    
    tempElement.innerHTML = Math.round(response.data.temperature.current);
    cityElement.innerHTML = response.data.city;
    descriptionElement.innerHTML = response.data.condition.description;
    iconElement.innerHTML = response.data.condition.icon_url;
    humidityElement.innerHTML = response.data.temperature.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "5acaob54d1tff787538b50f02534ee0a";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Lisbon&key=${apiKey}`;

axios.get(apiUrl).then(displayTemperature);
