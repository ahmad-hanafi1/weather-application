
let flagUrl = 'https://countryflagsapi.com/png/CITY_NAME';
let weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=da1157a0bfc4f1f5930acfc336a4e8c5&q=CITY_NAME'

let input= document.querySelector("#search");
let countryFlag = document.querySelector(".country-flag")
let weatherIcon = document.querySelector(".weather-icon")
let countryNameItem = document.querySelector(".country-name")

let weatherStatus = document.querySelector("h2");
let weatherDescription = document.querySelector("h4");



let feelsLike = document.querySelector(".feels-like");
let humidity = document.querySelector(".humidity");
let windSpeed = document.querySelector(".wind-speed");

async function changeTemp() {
    const response = await fetch(weatherUrl);
    const data = await response.json();
    

    let flagValue = flagUrl.slice(32);
    flagUrl = flagUrl.replace(flagValue, data.sys.country);
    

    let response2 = await fetch(flagUrl);
    
    const flag = await response2.blob();

    countryFlag.src = URL.createObjectURL(flag);
    countryNameItem.innerHTML = data.name;
    weatherIcon.src = "http://openweathermap.org/img/wn/10d@2x.png".replace('10d', data.weather[0].icon);

    
    weatherStatus.innerHTML = data.main.temp + " °C";
    weatherDescription.innerHTML = data.weather[0].description;
    
    feelsLike.innerHTML = data.main.feels_like + " °C";
    humidity.innerHTML =  data.main.humidity + "%";
    windSpeed.innerHTML = data.wind.speed + " m/s";

    let code = data.weather[0].icon;

    switch(data.weather[0].description) {
        case 'clear sky':
            document.body.style.background = 'url(https://cdn.pixabay.com/photo/2018/08/06/22/55/sun-3588618__480.jpg) no-repeat center center / cover';
            break;
            
        case 'few clouds':  
        case 'scattered clouds':
        case 'broken clouds':
        case "overcast clouds":
            document.body.style.background = 'url(https://i.pinimg.com/736x/ef/df/27/efdf27da8afa03f348f1c1c4f14acf49.jpg) no-repeat center center / cover';
            break;

        case 'shower rain':
        case 'rain':
        case 'thunderstorm':
            document.body.style.background = 'url(https://img.freepik.com/premium-photo/rain-drop-falling-onto-blackboard-with-green-nature-background_34152-328.jpg?w=2000) no-repeat center center / cover';
            break;

        case 'snow':
            document.body.style.background = 'urlhttps://i.pinimg.com/474x/46/26/f3/4626f3021f7b75223f4c8430ea41c317.jpg) no-repeat center center / cover';
            break;

        case "mist":
            document.body.style.background = 'https://live.staticflickr.com/6209/6087695435_4b545db144_b.jpg) no-repeat center center / cover';
            break;

    }
}
    

input.addEventListener("search", () =>{
    let oldValue = weatherUrl.slice(102);
    let newValue = input.value;
    weatherUrl = weatherUrl.replace(oldValue, newValue);

    if(document.getElementById('error')) {
        document.body.removeChild(document.getElementById('error'));
    }
    document.querySelector(".main-content").style.display = 'block';
    document.querySelector(".footer").style.display = 'flex';
    

    changeTemp().catch( (error) => {
        document.querySelector(".main-content").style.display = 'none';
        document.querySelector(".footer").style.display = 'none';
        let element = document.createElement('h1');
        element.setAttribute('id', 'error');
        element.innerHTML = 'ERROR :(';
        document.body.appendChild(element);
        console.log(error);
    });
    input.value = '';
    
} )


window.addEventListener('load', () => {

    weatherUrl = weatherUrl.replace('CITY_NAME', 'Nicosia');
    changeTemp();
    
})