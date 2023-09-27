<template>
    <div class="weather__settings">
        <h2 class="weather__settings-title">Settings</h2>
        <div class="weather__settings-input-block">
            <h3 class="weather__settings-subtitle">Add Location:</h3>
            <form class="weather__settings-form" @submit.prevent="addCountry">
                <input type="text" class="weather__settings-input" placeholder="Enter city..." v-model="inputValue">
                <input class="weather__settings-enter" type="submit" value="Add city">
                <p class="weather__settings-error" v-if="data.error" >{{ data.error }}</p>
            </form>

            <ul class="weather__settings-list">
                <li class="weather__settings-list-item current-weather" v-if="data.currentWeather">
                    <div class="list-item__title-block">
                        <h2 class="list-item__title">{{ data.currentWeather.name }}</h2>
                        <h3 class="list-item__temp">{{ Math.round(data.currentWeather.main.temp - 273.15) }}°</h3>
                    </div>
                    <img src="../assets/geo.png" alt="geo" class="list-item__geo">
                </li>
                <draggable v-model="data.weathers" itemKey="id" class="">
                    <template #item="{ element }">
                        <li class="weather__settings-list-item" :key="element.id">
                            <div class="list-item__title-block">
                                <h2 class="list-item__title">{{ element.name }}</h2>
                                <h3 class="list-item__temp">{{ Math.round(element.main.temp) }}°</h3>
                            </div>
                            <div class="list-item__button-block">
                                <img src="../assets/trash.svg" alt="trash" @click="deleteCountry(element.id)"
                                    class="list-item__delete">
                                <img src="../assets/drag.png" alt="drag" class="list-item__hamburger">
                            </div>
                        </li>
                    </template>
                </draggable>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useWeatherStore } from '../stores/WeatherStore';
import draggable from 'vuedraggable'

const { data, getWeather, deleteItem } = useWeatherStore()
const inputValue = ref<string>('')

onMounted(async () => {
    data.error = null
})

const addCountry = async () => {
    await getWeather(inputValue.value)
}
const deleteCountry = (id: number) => {
    deleteItem(id)
}
</script>

<style scoped>
.weather__settings {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.weather__settings-title {
    width: 100%;
    text-align: left;
    padding-left: 280px;
}
.weather__settings-input-block{
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
}
.weather__settings-subtitle {
    width: 100%;
    padding-left: 280px;
}
.weather__settings-form {
    width: 100%;
    padding-left: 280px;
}
.weather__settings-input {
    width: 300px;
    height: 23px;
    border-radius: 7px;
    padding-left: 10px;
}
.weather__settings-enter {
    width: 100px;
    height: 30px;
    border: none;
    border-radius: 7px;
    margin-left: 10px;
    cursor: pointer;
}
.weather__settings-error {
    color: red;
}
.list-item__title-block {
    display: flex;
    justify-content: space-between;
    width: 200px;
    align-items: center;
}
.current-weather {
    cursor: default!important
}

.weather__settings-list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 350px;
    padding-left: 280px;
}
.weather__settings-list-item {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    width: 350px;
    align-items: center;
    cursor: pointer;
}

.list-item__temp {
    color: blue
}

.list-item__button-block {
    display: flex;
    justify-content: space-between;
    width: 80px;
}

.list-item__delete {
    cursor: pointer;
    width: 30px;
    height: 30px;
}

.list-item__hamburger {
    cursor: pointer;
    width: 30px;
    height: 30px;    
}

.list-item__geo {
    width: 30px;
    height: 30px;
}
</style>