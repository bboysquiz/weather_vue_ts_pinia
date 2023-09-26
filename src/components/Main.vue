<script setup lang="ts">
import { onMounted } from 'vue';
import { useWeatherStore } from '../stores/WeatherStore';

const { data, getCurrentWeather } = useWeatherStore()
onMounted(async () => {
  if (!data.currentWeather) {
    await getCurrentWeather()
  }
})

</script>
<template>
  <div>
    <ul class="weather__list">
      <h2 v-if="data.isLoading === true">Loading...</h2>
      <li class="weather__list-item" v-if="data.currentWeather">
        <div class="weather__header">
          <h2 class="weather__location">{{ data.currentWeather.name }} , {{ data.currentWeather.sys.country }}</h2>
          <div class="weather__main-info">
            <h2 class="weather__degree">{{ Math.round(data.currentWeather.main.temp - 273.15) }}°</h2>
          </div>
        </div>
        <div class="weather__data">
          <p class="weather__descr">Feels like {{ Math.round(data.currentWeather.main.feels_like - 273.15) }}°, {{
            data.currentWeather.weather[0].description }}. Light
            breeze</p>
          <p class="weather__wind"><img src="../assets/navigator.png" alt="navigator" class="weather__nav-icon"> {{
            data.currentWeather.wind.speed
          }}m/s SSE</p>
          <p class="weather__pressure">{{ data.currentWeather.main.pressure }}hPa</p>
          <p class="weather__humidity">Humidity: {{ data.currentWeather.main.humidity }}%</p>
          <p class="weather__visibility">Visibility: {{ data.currentWeather.visibility }}m</p>
        </div>
      </li>
      <li class="weather__list-item" v-for="weather in data.weathers">
        <div class="weather__header">
          <h2 class="weather__location">{{ weather.name }} , {{ weather.sys.country }}</h2>
          <div class="weather__main-info">
            <h2 class="weather__degree">{{ Math.round(weather.main.temp) }}°</h2>
          </div>
        </div>
        <div class="weather__data">
          <p class="weather__descr">Feels like {{ Math.round(weather.main.feels_like) }}°, {{
            weather.weather[0].description }}. Light
            breeze</p>
          <p class="weather__wind"><img src="../assets/navigator.png" alt="navigator" class="weather__nav-icon"> {{
            weather.wind.speed
          }}m/s SSE</p>
          <p class="weather__pressure">{{ weather.main.pressure }}hPa</p>
          <p class="weather__humidity">Humidity: {{ weather.main.humidity }}%</p>
          <p class="weather__visibility">Visibility: {{ weather.visibility }}m</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.weather__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.weather__list-item {
  list-style-type: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 500px;
  background: linear-gradient(180deg, rgb(249, 254, 255), rgb(0, 95, 223));
  color: #000;
  border-radius: 10px;
  -webkit-box-shadow: 15px -17px 13px -8px rgba(157, 153, 235, 1);
  -moz-box-shadow: 15px -17px 13px -8px rgba(157, 153, 235, 1);
  box-shadow: 15px -17px 13px -8px rgba(157, 153, 235, 1);
  margin-top: 25px;
}

.weather__location {
  width: 50%;
  display: flex;
  justify-content: center;
}

.weather__main-info {
  width: 50%;
  display: flex;
  justify-content: center;
}

.weather__header {
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.weather__data {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.weather__data p {
  width: 40%;
  text-align: center;
}

.weather__nav-icon {
  width: 30px;
  height: 30px;
}
</style>

