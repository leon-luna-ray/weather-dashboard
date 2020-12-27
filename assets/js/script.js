$(document).ready(function(){
    // API key and units.
    const apiKey = "40d735c04b7e328dff495db17c0a745b";
    const dataUnits = "imperial"; // Possibility to add metric functionality.

    // Load last searched city.
    if (window.localStorage.getItem("previous-city") === null) {
        // Load weather for Portland on first vist. Possibility to load based on user location.
        cityWeather("Portland", apiKey, dataUnits);
        cityForecast("Portland", apiKey, dataUnits);
    } else {
        // Load weather for previously searched city.
        cityWeather(localStorage.getItem("previous-city"), apiKey, dataUnits);
        cityForecast(localStorage.getItem("previous-city"), apiKey, dataUnits);
    };

    // Event listener for searched city.
    $("#search-button").click(citySearch);

    // $("#search-bar") // Need to figure out how to do a keyup event on "enter" and clear the search bar in the function.
    function citySearch(){
        const userCity = $("#city-search").val();

        // Local storage key for last searched city.
        localStorage.setItem("previous-city", userCity);

        // Clear previous city data.
        $(".current-weather").empty();
        $(".forecast").empty();

        // Invoke save, current weather and forecast functions.
        saveCity(userCity);
        cityWeather(userCity, apiKey, dataUnits);
        cityForecast(userCity, apiKey, dataUnits);
    }; // citySearch(); 

    // Save serach history to local storage.
    function saveCity(city) {
        let citiesArr = [];
        citiesArr.push(city)

        // If local storage is empty create new key for saving searches.
        if(window.localStorage.getItem("saved-cites") === null) {
            localStorage.setItem("saved-cites", citiesArr);
        } else { // If there are searches saved merge to the new array.
            const savedCities = $.merge(citiesArr, localStorage.getItem("saved-cites").split(","));
            // Save updated array in local storage.
            localStorage.setItem("saved-cites", savedCities);

            // Invoke function to render search history dropdown.
            searchHistory(savedCities);
            console.log(savedCities);
        }
    }; // saveCity()


    // Create function to render previous searches into the dropdown menut here using an on click event using (this):

    function searchHistory(cities){
        console.log(cities)
        for (let i = 0; i < cities.length; i++) {
            const cityListItem = cities[i];
            console.log(cityListItem)
        }
    };

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
            const currentWindSpeed = $("<p>").addClass("current-wind").text("Wind: " + data.wind.speed.toFixed() + " mph");
            const currentHumdity = $("<p>").addClass("current-humidity").text("Humidity: " + data.main.humidity + "%");
            const currentIcon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

            // Append current weather data.
            cityName.append(currentIcon);
            currentCardBody.append(cityName, currentTemp, currentWindSpeed, currentHumdity);
            currentWeatherCard.append(currentCardBody);
            $(".current-weather").append(currentWeatherCard);

            // UV API call.
            function cityUV(lat, lon){
                $.ajax({
                url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + key
            }).then(function getUV(data) {
                // Append UV data to card body.
                const uvData = data.value;
                const cityUV = $("<p>").addClass("city-uv").text("UV: " + uvData);
                $(currentCardBody).append(cityUV);

                // Change UV index color.
                if (uvData < 4) {
                    $(".city-uv").attr("id", "uv-green");
                } else if (uvData >= 4 && uvData <= 8) {
                    $(".city-uv").attr("id", "uv-yellow");
                } else if (uvData > 8) {
                    $(".city-uv").attr("id", "uv-red");
                }; 
                }); // ajax()
            };  // cityUV()

            // Run cityUv with coordinate data.
            cityUV(data.coord.lat, data.coord.lon); 

        }); //getWeather()
    }; // cityWeather()

// Five day forecast.
function cityForecast(city, key, units) {
    const forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" + units + "&appid=" + key;
    // API call for forecast.
    $.ajax( {
        url: forecastQueryURL
    }).then(function getForecast(data) {
        // Created array with diffent days from the data.
        const daysArray = [data.list[0], data.list[8], data.list[16], data.list[24], data.list[32]];

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
        };  // loop
    }); // getforecast()
    };  // cityforecast()
}); // document.ready()