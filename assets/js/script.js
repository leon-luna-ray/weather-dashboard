$(document).ready(function(){
    $("#search-button").on("click", function citySearch(){
        const userCity = "portland" //$("#city-search").val(); temp change for testing purposes
        const apiKey = "40d735c04b7e328dff495db17c0a745b";
        const dataUnits = "imperial"; // Possibility to add metric functionality later.
        cityWeather(userCity, apiKey, dataUnits);
        cityForecast(userCity, apiKey, dataUnits);
});

function cityWeather(city, key, units) {
const cityQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + units + "&appid=" + key;
// Render weather data for the searched city.
$.ajax( {
    url: cityQueryURL
}).then(function getWeather(data) {
    //City weather data card.
    const currentWeatherCard = $("<div>").addClass("current-card");
    const currentCardBody = $("<div>").addClass("current-card-body");
    const cityName = $("<h1>").addClass("city-name").text(data.name);
    const currentTemp = $("<p>").addClass("current-temprature").text(data.main.temp.toFixed()  + "°F");
    const currentWindSpeed = $("<p>").addClass("current-wind").text(data.wind.speed.toFixed() + " mph");
    const currentHumdity = $("<p>").addClass("current-humidity").text(data.main.humidity + "%");
    const currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

    cityName.append(currentIcon);
    currentCardBody.append(cityName, currentTemp, currentHumdity, currentWindSpeed);
    currentWeatherCard.append(currentCardBody);
    $(".current-weather").append(currentWeatherCard);

    // UV API call
    function getUV(lat, lon){
        $.ajax({
        url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + key
    }).then(function(data) {
        // Append UV data to card body
        const uvData = data.value;
        const cityUV = $("<p>").addClass("city-uv").text(uvData);
        $(currentCardBody).append(cityUV);

        // Change UV index color 
        if (uvData < 4) {
            $(".city-uv").attr("id", "uv-green");
        } else if (uvData >= 4 && uvData <= 8) {
            $(".city-uv").attr("id", "uv-yellow");
        } else if (uvData > 8) {
            $(".city-uv").attr("id", "uv-red");
        };
        });
        }; // getUV
    // Invoke the UV function with coordinate data for location.
    getUV(data.coord.lat, data.coord.lon); 
    });
}; // cityWeather

    // Get forecast function loop.
    function cityForecast(city, key, units) {
        const forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" + units + "&appid=" + key;

    // API call for forecast.
    $.ajax( {
        url: forecastQueryURL
    }).then(function getForecast(data) {
        const daysArray = [data.list[3], data.list[11], data.list[19], data.list[27], data.list[35]];

        // For loop to pull noon forecast data from ajax and append forecast cards to page.
        for (let i = 0; i < daysArray.length; i++){
            // Set up variables to crate forecast elements.
            const forecastCard = $("<div>").addClass("forecast-card");
            const forecastCardBody = $("<div>").addClass("forecast-card-body");
            const forecastDate = $("<h1>").addClass("forecast-date").text(daysArray[i].dt_txt);
            const forecastTemp = $("<p>").addClass("forecast-temprature").text(daysArray[i].main.temp.toFixed()  + "°F");
            const forecastHumidity = $("<p>").addClass("forecast-humidity").text("Humidity: " + daysArray[i].main.humidity + "%"); 
            const forecastIcon =  $("<img>").attr("src", "http://openweathermap.org/img/w/" + daysArray[i].weather[0].icon + ".png").addClass("forecast-icon");

            forecastDate.append(forecastIcon);
            forecastCardBody.append(forecastDate, forecastTemp, forecastHumidity);
            forecastCard.append(forecastCardBody);
            $(".forecast").append(forecastCard);

            console.log(forecastHumidity);
            
            // create card and append to page for each of the indecies in the days array, hopefully it won't change and it keeps this same pattern.
            // card body (copy above)
            // append to each card
            //$("<img>").attr("src", 
        }
        



    // card body (copy above)
    // append to each card

    }); // getforecast
    }; // cityforecast






}); // wrapper

    // TODO:
    // history or local storage at the very least.
    // stying issues if time available.    






// // forecast API
// 

// $.ajax( {
//     url: forecastQueryURL
// }).then(function(data){
//     let forecastDates = data.list
//     for (let i = 8; i < forecastDates.length; i+8) {

//         for (let j = 0; j < array.length; j++) {
//             const element = array[j];
            
//         }
//         let forecastDate = data.list[i].dt_txt
//         $("#city-forecast").append(forecastDate);

//         console.log(forecastDate)
        // } // need to figure out how to get five days to render

// });