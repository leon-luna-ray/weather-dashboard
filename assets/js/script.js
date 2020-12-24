$(document).ready(function(){
    $("#search-button").on("click", function(){
        const userCity = "portland" //$("#city-search").val(); temp change
        searchedCity(userCity)
});


let dataUnits = "imperial"; // possibly add functionality to change to metric
function searchedCity(userCity) {
const apiKey = "40d735c04b7e328dff495db17c0a745b";
const cityQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userCity + "&units=" + dataUnits + "&appid=" + apiKey;

// Current conditions
$.ajax( {
    url: cityQueryURL
}).then(function(data) {
    //weather data card
    const cityName = $("<h1>").addClass("city-name").text(data.name);
    const cityOneDayDiv = $("<div>").addClass("one-day-card");
    const cityWindSpeed = $("<p>").addClass("wind-data").text(data.wind.speed.toFixed() + " mph");
    const cityHumidity = $("<p>").addClass("humidity-data").text(data.main.humidity + "%");
    const cityTemp = $("<p>").addClass("city-temprature").text(data.main.temp.toFixed()  + "°F");
    const cardBody = $("<div>").addClass("card-body");
    const weatherImage = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");
    cityName.append(weatherImage)
    cardBody.append(cityName, cityTemp, cityHumidity, cityWindSpeed)
    cityOneDayDiv.append(cardBody)
    $(".city-data").append(cityOneDayDiv)

    // get uv function
    // const cityLat = data.coord.lat;
    // const cityLon = data.coord.lon;
    // searchedCity(userCity);
    // function getUV(lat, lon){
    //     $.ajax({
    //     url: uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey
    // }).then(function(data) {
    //     const cityUV = data.value;
    //     $("#uv-val").append(cityUV);
    //     console.log(data)
    //     // Change UV index color 
    //     if (cityUV < 4){
    //         $("#uv-val").attr("class" , "uv-green");
    //     } else if (cityUV >= 4 && cityUV <= 8){
    //         $("#uv-val").attr("class", "uv-yellow");
    //     } else if (cityUV > 8){
    //         $("#uv-val").attr("class", "uv-red");
    //     }
    // });
    // };



    // get forcast function loop
    // history?

}); //ajax
};  //searched city
}); // wrapper







//     // UV API
//     $.ajax({
//         url: uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + apiKey
//     }).then(function(data) {
//         const cityUV = data.value;
//         $("#uv-val").append(cityUV);

//         // Change UV index color 
//         if (cityUV < 4){
//             $("#uv-val").attr("class" , "uv-green");
//         } else if (cityUV >= 4 && cityUV <= 8){
//             $("#uv-val").attr("class", "uv-yellow");
//         } else if (cityUV > 8){
//             $("#uv-val").attr("class", "uv-red");
//         }
//     });
// });
// }; // Searched city

// // Forcast API
// const forcastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity + "&units=" + dataUnits + "&appid=" + apiKey;

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

// }); //Wrapper