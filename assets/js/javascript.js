
var searchBtnEl = document.querySelector('.searchBtn');
var cityInputEl = document.querySelector('#city-input');
var cityInput = cityInputEl.value.trim();
var userInput = JSON.parse(localStorage.getItem("userInput")) || [];

function createCityButton(input) {
  
  var item = input;
  item = document.createElement("button");
  $(item).attr("class", "btn btn-success");
  $(item).text(input);
  $(".btn-group-vertical").append(item);
}


function createButtonsFromStorage() {
if(userInput.length === 0) {
return;
} else {
userInput.forEach(function(item) {
  var button = document.createElement("button");
  var text = document.createTextNode(item);
  button.appendChild(text);;
  button.setAttribute("class", "btn btn-success");
  document.getElementById("btn-group").appendChild(button);
});  
}
}

  function getCurrentApi(input) {
    var current = ("https://api.openweathermap.org/data/2.5/weather?q=" + input + "&units=imperial&appid=1f364b690ba0da2c164fff89c7a52ffc");
    var currentWeather = [];
    var city = input;
    fetch(current)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var t = new Date(data.dt*1000).toLocaleDateString("en-US")

    $("#name").text(data.name);
    $("#date").text(t);
    $("#cur-icon").attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png");
    $("#temp").text(data.main.temp);
    $("#humid").text(data.main.humidity);
    $("#wind").text(data.wind.speed);
    // UV DATA was retired on 1st April 2021 and only available by calling the lat/long - too complicated for me!
    // $("#uv").text(data.);

    })
    .then(function(){
      // fetch request gets the 5 day / 3 hour weather forecast data for the city input by the user
      var forecast = ("https://api.openweathermap.org/data/2.5/forecast/?q=" + city + "&units=imperial&appid=502a7cedc9bc23670457e4afec8bcfe1");
      console.log(forecast);      
      fetch(forecast)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

        // Set day one forecast
        $("#1date").text(new Date(data.list[8].dt*1000).toLocaleDateString("en-US"));
        $("#1icon").attr("src", "https://openweathermap.org/img/wn/" + data.list[8].weather[0].icon + "@2x.png");
        $("#1temp").text(data.list[8].main.temp);
        $("#1humid").text(data.list[8].main.humidity);

        // Set day three forecast
        $("#2date").text(new Date(data.list[16].dt*1000).toLocaleDateString("en-US"));
        $("#2icon").attr("src", "https://openweathermap.org/img/wn/" + data.list[16].weather[0].icon + "@2x.png");
        $("#2temp").text(data.list[16].main.temp);
        $("#2humid").text(data.list[16].main.humidity);

        // Set day three forecast
        $("#3date").text(new Date(data.list[24].dt*1000).toLocaleDateString("en-US"));
        $("#3icon").attr("src", "https://openweathermap.org/img/wn/" + data.list[24].weather[0].icon + "@2x.png");
        $("#3temp").text(data.list[24].main.temp);
        $("#3humid").text(data.list[24].main.humidity);

        // Set day three forecast
        $("#4date").text(new Date(data.list[32].dt*1000).toLocaleDateString("en-US"));
        $("#4icon").attr("src", "https://openweathermap.org/img/wn/" + data.list[32].weather[0].icon + "@2x.png");
        $("#4temp").text(data.list[32].main.temp);
        $("#4humid").text(data.list[32].main.humidity);

        // Set day three forecast
        $("#5date").text(new Date(data.list[39].dt*1000).toLocaleDateString("en-US"));
        $("#5icon").attr("src", "https://openweathermap.org/img/wn/" + data.list[39].weather[0].icon + "@2x.png");
        $("#5temp").text(data.list[39].main.temp);
        $("#5humid").text(data.list[39].main.humidity);
         });
    });
  }


// Set an event listener to save city name input by user to local storage
$(".searchBtn").on("click", function () {
    // Get nearby values of the description in JQuery
    var input = $(this).siblings("#city-input").val().trim();

    if (input) {
        getCurrentApi(input);
      } else {
        alert('Please enter a City');
        return;
      }

    // Save text in local storage
    // var addCity = {"input};
    userInput.push(input);
    localStorage.setItem("userInput", JSON.stringify(userInput));

    createCityButton(input);

})

$("#btn-group").on("click", ".btn-success", function () {
  var input = $(this).text();
  console.log(input);
  getCurrentApi(input);
})

createButtonsFromStorage();