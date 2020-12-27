$(document).ready(function(){
    // Event listener for searched city.
    $("#search-button").on("click", function citySearch(){
        const userCity = $("#city-search").val();
        const apiKey = "40d735c04b7e328dff495db17c0a745b";
        const dataUnits = "imperial"; // Possibility to add metric functionality later.

        // Invoke current weather and forecast functions.
        saveCity(userCity);
        cityWeather(userCity, apiKey, dataUnits);
        cityForecast(userCity, apiKey, dataUnits);
    }); // citySearch

    // Store searches to local storage.
    function saveCity(city) {
        let citiesArr = [];
        citiesArr.push(city)

        // If local storage is empty create new key, else add the current search.

        if(window.localStorage.getItem("stored-cites") === null) {
            localStorage.setItem("stored-cites", citiesArr);
        } else {
            let savedCities = localStorage.getItem("stored-cites").split(",");
            citiesArr.push(savedCities)
            // Searches are stored in reverse chronological order.
            localStorage.setItem("stored-cites", citiesArr);
        }
    }; // saveCity

    // Render/pull city function

    // Current weather condtions.
    function cityWeather(city, key, units) {
    const cityQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + units + "&appid=" + key;
        $.ajax({
            url: cityQueryURL
        }).then(function getWeather(data) {
            // City weather data card.
            const currentWeatherCard = $("<div>").addClass("current-card");
            const currentCardBody = $("<div>").addClass("current-card-body");
            const cityName = $("<h1>").addClass("city-name").text(data.name);
            const currentTemp = $("<p>").addClass("current-temprature").text(data.main.temp.toFixed()  + "°F");
            const currentWindSpeed = $("<p>").addClass("current-wind").text(data.wind.speed.toFixed() + " mph");
            const currentHumdity = $("<p>").addClass("current-humidity").text(data.main.humidity + "%");
            const currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

            // Append current weather data.
            cityName.append(currentIcon);
            currentCardBody.append(cityName, currentTemp, currentHumdity, currentWindSpeed);
            currentWeatherCard.append(currentCardBody);
            $(".current-weather").append(currentWeatherCard);

            // UV API call.
            function cityUV(lat, lon){
                $.ajax({
                url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + key
            }).then(function getUV(data) {
                // Append UV data to card body.
                const uvData = data.value;
                const cityUV = $("<p>").addClass("city-uv").text(uvData);
                $(currentCardBody).append(cityUV);

                // Change UV index color.
                if (uvData < 4) {
                    $(".city-uv").attr("id", "uv-green");
                } else if (uvData >= 4 && uvData <= 8) {
                    $(".city-uv").attr("id", "uv-yellow");
                } else if (uvData > 8) {
                    $(".city-uv").attr("id", "uv-red");
                }; 
                }); // ajax
            };  // cityUV

            // Run cityUv with coordinate data.
            cityUV(data.coord.lat, data.coord.lon); 

        }); //getWeather
    }; // cityWeather

// Five day forecast.
function cityForecast(city, key, units) {
    const forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" + units + "&appid=" + key;
    // API call for forecast.
    $.ajax( {
        url: forecastQueryURL
    }).then(function getForecast(data) {
        // Created array with diffent days from the data.
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

            // Append forecast cards.
            forecastDate.append(forecastIcon);
            forecastCardBody.append(forecastDate, forecastTemp, forecastHumidity);
            forecastCard.append(forecastCardBody);
            $(".forecast").append(forecastCard);
        };  // for loop
    }); // getforecast
    };  // cityforecast
}); // document.ready