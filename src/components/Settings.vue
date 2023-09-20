<template>
    <div>
        Settings
        <div class="weather__settings-input-block">
            <h2 class="weather__settings-title">Add Location:</h2>
            <form class="weather__settings-form" @submit.prevent="addCountry">
                <input type="text" class="weather__settings-input" placeholder="Enter city..." v-model="inputValue">
                <input class="weather__settings-enter" type="submit" value=" ">
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWeatherStore } from '../stores/WeatherStore';

const weather = useWeatherStore()
const inputValue = ref<string>('')

const addCountry = async () => {
    await weather.getWeather(inputValue.value)
}
</script>

<style scoped></style>