const apiKey = '536b2f3b7210429391c184304231805';

const searchBar = document.getElementById('search_bar');
const getWeatherButton = document.getElementById('get_weather_button');
const country = document.querySelector('.set_country');
const city = document.querySelector('.set_city');
const timeZone = document.querySelector('.set_time_zone');
const currentTime = document.querySelector('.set_time');
const conditionImg = document.querySelector('.condition_img');
const conditionText = document.querySelector('.condition_text');
const windDirection = document.querySelector('.wind_direction');
const windSpeed = document.querySelector('.wind_speed');
const reportedTemperature = document.querySelector('.reported_temperature');
const feelsLike = document.querySelector('.feels_like_temp');

const cities = [
  'Budapest',
  'Bucuresti',
  'Milano',
  'Manila',
  'Cairo',
  'Berlin',
  'Paris',
  'Barcelona',
];

getWeatherButton.addEventListener('click', (e) => {
  e.preventDefault(); //! Remove once done
  if (searchBar.value !== '') {
    getRawData(searchBar.value);
  }
});

async function getRawData(userCity) {
  country.innerText = '...';
  city.innerText = '...';
  timeZone.innerText = '...';
  currentTime.innerText = '...';
  windDirection.innerText = '...';
  windSpeed.innerText = '...';
  reportedTemperature.innerText = '...';
  feelsLike.innerText = '...';
  conditionText.innerText = '...';
  conditionImg.src = '';
  conditionImg.alt = '';
  try {
    const response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${userCity}&days=3&aqi=no`
    );
    const rawData = await response.json();
    country.innerText = rawData.location.country;
    city.innerText = rawData.location.name;
    timeZone.innerText = rawData.location.tz_id;
    currentTime.innerText = rawData.location.localtime;
    windDirection.innerText = rawData.current.wind_dir;
    windSpeed.innerText = rawData.current.wind_kph + 'km/h';
    reportedTemperature.innerText = rawData.current.temp_c + '°C';
    feelsLike.innerText = rawData.current.feelslike_c + '°C';
    conditionImg.src = rawData.current.condition.icon;
    conditionImg.alt = rawData.current.condition.text;
    conditionText.innerText = rawData.current.condition.text;
    searchBar.value = '';
    console.log(rawData);
  } catch (error) {
    console.log('Something went wrong ');
  }
}
