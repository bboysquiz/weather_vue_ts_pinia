<template>
    <div>
        Settings
        <div class="weather__settings-input-block">
            <h2 class="weather__settings-title">Add Location:</h2>
            <form class="weather__settings-form" @submit.prevent="addCountry">
                <input type="text" class="weather__settings-input" placeholder="Enter city..." v-model="inputValue">
                <input class="weather__settings-enter" type="submit" value=" ">
            </form>

            <div class="weather__settings-list">
                <draggable v-model="data.weathers" itemKey="id" class="weather__settings-list">
                    <template #item="{ element }">
                        <li class="weather__settings-list-item" :key="element.id">
                            <div class="list-item__title-block">
                                <h2 class="list-item__title">{{ element.name }}</h2>
                                <h3 class="list-item__temp">{{ element.main.temp }}°</h3>
                            </div>
                            <div class="list-item__button-block">
                                <img src="../assets/trash.svg" alt="trash" @click="deleteCountry(element.id)"
                                    class="list-item__delete">
                                <img src="../assets/drag.png" alt="drag" class="list-item__hamburger">
                            </div>
                        </li>
                    </template>
                </draggable>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWeatherStore } from '../stores/WeatherStore';
import draggable from 'vuedraggable'

const { data, getWeather, deleteItem } = useWeatherStore()
const inputValue = ref<string>('')

const addCountry = async () => {
    await getWeather(inputValue.value)
}
const deleteCountry = (id: number) => {
    deleteItem(id)
}
</script>

<style scoped>

.list-item__title-block {
    display: flex;
    justify-content: space-between;
    width: 200px;
    align-items: center;
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
</style>