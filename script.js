const apiKey = '9fc240a4a1f0455c91b172514231905';

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
const locationBackground = document.querySelector('#location_body');
const weatherBackground = document.querySelector('#weather_body');

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
      `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${userCity}&days=3&aqi=no` &&
        `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${userCity}&days=3&aqi=no`
    );
    const rawData = await response.json();

    console.log(rawData);

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
    const reqTime = currentTime.innerText
      .split('')
      .splice(11)
      .join('')
      .split(':')[0];

    switch (true) {
      case reqTime >= 0 && reqTime <= 6:
        locationBackground.style.backgroundImage =
          'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)';
        weatherBackground.style.backgroundImage =
          'linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)';
        break;
      case reqTime >= 6 && reqTime <= 12:
        locationBackground.style.backgroundImage =
          'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)';
        weatherBackground.style.backgroundImage =
          'linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)';
        break;
      case reqTime >= 12 && reqTime <= 18:
        locationBackground.style.backgroundImage =
          'linear-gradient(0deg, rgba(195,34,153,1) 0%, rgba(253,125,45,1) 100%)';
        weatherBackground.style.backgroundImage =
          'linear-gradient(0deg, rgba(195,34,153,1) 0%, rgba(253,125,45,1) 100%)';
        break;
      case reqTime >= 18 && reqTime <= 24:
        locationBackground.style.backgroundImage =
          'linear-gradient(0deg, rgba(42,34,195,1) 0%, rgba(191,45,253,1) 100%)';
        weatherBackground.style.backgroundImage =
          'linear-gradient(0deg, rgba(42,34,195,1) 0%, rgba(191,45,253,1) 100%)';
        break;
    }
  } catch (error) {
    console.log('Something went wrong ');
  }
}
