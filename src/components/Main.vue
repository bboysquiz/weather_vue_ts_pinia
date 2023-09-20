<script setup lang="ts">
import { onMounted } from 'vue';
import { useWeatherStore } from '../stores/WeatherStore';

const { data, getCurrentWeather } = useWeatherStore()
onMounted( async () => {
  await getCurrentWeather()
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
          <p class="weather__descr">Feels like {{ Math.round(data.currentWeather.main.feels_like - 273.15) }}, {{ data.currentWeather.weather[0].description }}. Light
            breeze</p>
          <p class="weather__wind"><img src="../assets/navigator.png" alt="navigator" class="weather__nav-icon"> {{ data.currentWeather.wind.speed
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
            <img class="weather__img" src="https://img.icons8.com/emoji/48/null/sun-behind-small-cloud.png" />
            <span class="weather__degree">{{ weather.main.temp }}</span>
          </div>
        </div>
        <div class="weather__data">
          <p class="weather__descr">Feels like {{ weather.main.feels_like }}, {{ weather.weather[0].description }}. Light
            breeze</p>
          <p class="weather__wind"><img src="../assets/navigator.png" alt="navigator" class="widget__nav-icon"> {{ weather.wind.speed
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
</style>

