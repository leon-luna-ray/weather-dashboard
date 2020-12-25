$(document).ready(function(){
    $("#search-button").on("click", function citySearch(){
        const userCity = "portland" //$("#city-search").val(); temp change for testing purposes
        const apiKey = "40d735c04b7e328dff495db17c0a745b";
        const dataUnits = "imperial"; // possibly add functionality to change to metric
        cityWeather(userCity, apiKey, dataUnits);
        cityForcast(userCity, apiKey, dataUnits);
});

function cityWeather(city, key, units) {
const cityQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + units + "&appid=" + key;
// Render weather data for the searched city.
$.ajax( {
    url: cityQueryURL
}).then(function getWeather(data) {
    //City weather data card.
    const cityName = $("<h1>").addClass("city-name").text(data.name);
    const cityOneDayDiv = $("<div>").addClass("one-day-card");
    const cityWindSpeed = $("<p>").addClass("wind-data").text(data.wind.speed.toFixed() + " mph");
    const cityHumidity = $("<p>").addClass("humidity-data").text(data.main.humidity + "%");
    const cityTemp = $("<p>").addClass("city-temprature").text(data.main.temp.toFixed()  + "°F");
    const cardBody = $("<div>").addClass("card-body");
    const weatherImage = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    cityName.append(weatherImage);
    cardBody.append(cityName, cityTemp, cityHumidity, cityWindSpeed);
    cityOneDayDiv.append(cardBody);
    $(".city-data").append(cityOneDayDiv);

    // UV API call
    function getUV(lat, lon){
        $.ajax({
        url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + key
    }).then(function(data) {
        // Append UV data to card body
        const uvData = data.value;
        const cityUV = $("<p>").addClass("city-uv").text(uvData);
        $(cardBody).append(cityUV);

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

    // Get forcast function loop.
    function cityForcast(city, key, units) {
 
        const forcastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=" + units + "&appid=" + key;
        console.log(forcastQueryURL)

    // API call for forcast.
    $.ajax( {
        url: forcastQueryURL
    }).then(function getForcast(data) {
        //const day1 = data.list[3].dt_txt;
        
        const daysArray = [data.list[3], data.list[11], data.list[19], data.list[27], data.list[35]];

        for (let i = 0; i < daysArray.length; i++){

            console.log(daysArray[i])
            // create card and append to page for each of the indecies in the days array, hopefully it won't change and it keeps this same pattern.
           
        }
        
    // idea, crate a for loop first, then add everything below similar to the previous funciton getCurrentConditions

    // Set up variables to crate html tag, calss and value with data from ajax
    // card body (copy above)
    // append to each card

    }); // getForcast
    }; // cityForcast






}); // wrapper

    // TODO:
    // history or local storage at the very least.
    // stying issues if time available.    






// // Forcast API
// 

// $.ajax( {
//     url: forcastQueryURL
// }).then(function(data){
//     let forcastDates = data.list
//     for (let i = 8; i < forcastDates.length; i+8) {

//         for (let j = 0; j < array.length; j++) {
//             const element = array[j];
            
//         }
//         let forcastDate = data.list[i].dt_txt
//         $("#city-forcast").append(forcastDate);

//         console.log(forcastDate)
        // } // need to figure out how to get five days to render

// });