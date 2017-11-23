var isCelsius = true;
var storedData;

function showLocalWeather () {
    navigator.geolocation.getCurrentPosition(function (location) {
        console.log(location);
        var lat = location.coords.latitude;
        var lon = location.coords.longitude;
        fetch(
            'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + lon,
            {
                method: 'get'
            }
        )
            .then(function (result) {
                return result.json();
            })
            .then(function (data) {
                storedData = data;

                document.querySelector('.weather-data').classList.remove('hide');
                document.querySelector('.toggle-degrees-container').classList.remove('hide');

                renderData(storedData);
            })
    });
}

function renderData (data) {
    const city = data.name;
    const temperature = data.main.temp_max;
    const weather = data.weather[0].main.toLowerCase();
    const icon = data.weather[0].icon;
    console.log(data);
    document.getElementById('location').innerText = city;
    document.getElementById('weather-status').innerText = weather;
    document.getElementsByClassName('icon')[0].setAttribute('src', icon);
    if (isCelsius) {
        document.getElementsByClassName('degrees')[0].innerText = temperature + '°C';
    } else {
        var temperatureFahrenheit = Math.round(temperature * 1.8 + 32);
        document.getElementsByClassName('degrees')[0].innerText = temperatureFahrenheit + '°F';
    }
}

document.getElementById('show-data').addEventListener('click', showLocalWeather);
document.getElementById('toggle-degrees').addEventListener('click', function () {
    isCelsius = !isCelsius;
    if (storedData) {
        renderData(storedData);
    }
});

