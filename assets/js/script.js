let searchedCity = "Portland";
let dataUnits = "imperial";

const apiKey = "40d735c04b7e328dff495db17c0a745b";
const cityQueryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + searchedCity + "&units=" + dataUnits + "&appid=" + apiKey;

// Current conditions
$.ajax( {
    url: cityQueryURL
}).then(function(data) {
    const cityName = data.name;
    const cityLat = data.coord.lat;
    const cityLon = data.coord.lon;
    const cityTemp = data.main.temp.toFixed()  + "°F"; //rounded to whole number
    const cityWindSpeed = data.wind.speed.toFixed() + " mph";
    const cityHumidity = data.main.humidity + "%";

    // Append data to page
    $("#city-name").prepend(cityName);
    $("#city-temprature").append(cityTemp);
    $("#wind-data").append(cityWindSpeed);
    $("#humidity-data").append(cityHumidity);

    // UV API
    $.ajax({
        url: uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + cityLat + "&lon=" + cityLon + "&appid=" + apiKey
    }).then(function(data) {
        const cityUV = data.value;
        $("#uv-val").append(cityUV);

        // Change UV index color 
        if (cityUV < 4){
            $("#uv-val").attr("class" , "uv-green");
        } else if (cityUV >= 4 && cityUV <= 8){
            $("#uv-val").attr("class", "uv-yellow");
        } else if (cityUV > 8){
            $("#uv-val").attr("class", "uv-red");
        }
    });
});

// Forcast API
const forcastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchedCity + "&units=" + dataUnits + "&appid=" + apiKey;

$.ajax( {
    url: forcastQueryURL
}).then(function(data){
    console.log(data);
});

