// var url = ("https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=1f364b690ba0da2c164fff89c7a52ffc");

// var userFormEl = document.querySelector('#user-form');
var searchBtnEl = document.querySelector('.searchBtn');
var cityInputEl = document.querySelector('#city-input');
var cityInput = cityInputEl.value.trim();
var userInput = JSON.parse(localStorage.getItem("userInput")) || [];


var formSubmitHandler = function (event) {
    event.preventDefault();
    console.log(cityInput);
  
    if (cityInput) {
      getApi();
    } else {
      alert('Please enter a City');
    }
  };
function getApi(input) {
    // fetch request gets the weather forcast for the city input by the user
    var url = ("https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=1f364b690ba0da2c164fff89c7a52ffc");      
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)


      });
  }
  
// Set an event listener to save city name input by user to local storage
$(".searchBtn").on("click", function () {
    // Get nearby values of the description in JQuery
    var input = $(this).siblings("#city-input").val().trim();
    var city = "city";

    if (input) {
        getApi(input);
      } else {
        alert('Please enter a City');
        return;
      }

    // Save text in local storage
    var cityObject = {"city": input};
    userInput.push(cityObject);
    localStorage.setItem("userInput", JSON.stringify(userInput));

    createCityButtons(input);

})

function createCityButtons(input) {
  
    for (var i = 0; i < userInput.length; i++ ) {
        var item = document.createElement("button");
        $(item).attr("id", input);
        $(item).attr("class", "btn btn-success");
        $(item).text(input);
        $(".btn-group-vertical").append(item);
    }
  }
