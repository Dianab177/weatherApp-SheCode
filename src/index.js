//display the time using JavaScript: Tuesday 16:00

let date = document.querySelector("#date");
date.innerHTML = newDay(new Date());
function newDay(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let formatDate = `${day} ${hour}:${minutes}`;
  return formatDate;
}

// //display the city name
function search(event) {
  event.preventDefault();
  let h4 = document.querySelector("h4");
  let searchInput = document.querySelector("#search-text-input");
  if (searchInput.value) {
    h4.innerHTML = `${searchInput.value}`;
    let apiKey = "a3c3f210b30127cb5ef5c59041b27e29";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showCity);
  } else {
    h4.innerHTML = null;
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

// // search degrees function
function showCity(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#degrees");
  degrees.innerHTML = `${temperature}ºC`;
}

//Geolocation degrees

function showPosition(position) {
  let apiKey = "a3c3f210b30127cb5ef5c59041b27e29";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let geoApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(geoApiUrl).then(showCity);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentLocationButton = document.querySelector("#current");
currentLocationButton.addEventListener("click", getPosition);
