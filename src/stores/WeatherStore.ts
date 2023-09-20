import { defineStore } from 'pinia';
import { ref, Ref } from 'vue';
import axios, { AxiosResponse } from 'axios'

interface WeatherData {
    base: string,
    clouds: {
        all: number
    },
    cod: number,
    coord: {
        lat: number,
        lon: number
    },
    dt: number,
    id: number,
    main: {
        temp: number,
        humidity: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number
    },
    name: string,
    sys: {
        country: string,
        id: number,
        sunrise: number,
        sunset: number,
        type: number
    },
    timezone: number,
    visibility: number,
    weather: WeatherItem[],
    wind: {
        deg: number,
        gust: number,
        speed: number
    }
}

interface WeatherItem {
    description: string,
    icon: string,
    id: number,
    main: string,
}

export const useWeatherStore = defineStore('weathers', () => {
    const weathers: Ref<WeatherData[]> = ref([])
    const lon: Ref<number | null> = ref(null)
    const lat: Ref<number | null> = ref(null)
    const isLoading: Ref<boolean> = ref(false)
    const currentWeather: Ref<WeatherData | null> = ref(null)

    const getWeather = async (cityName: string): Promise<void> => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=67c859d5010465976e7b3e885122af9a&units=metric`;
            const response: AxiosResponse<WeatherData> = await axios.get(url);
            weathers.value = [...weathers.value, response.data];
            console.log(weathers.value)
        } catch (error) {
            console.error(error);
        }
    };

    const getCurrentWeather = async (): Promise<void> => {
        isLoading.value = true
        navigator.geolocation.getCurrentPosition(async function (position) {
            lon.value = position.coords.longitude
            lat.value = position.coords.latitude
            console.log("Latitude:", lat.value, "Longitude:", lon.value);
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat.value}&lon=${lon.value}&appid=67c859d5010465976e7b3e885122af9a`;
                const response: AxiosResponse<WeatherData> = await axios.get(url);
                currentWeather.value = response.data
                console.log(currentWeather.value)
                isLoading.value = false
            } catch (error) {
                console.error(error);
            }
        }, function (error) {
            console.error("Error occurred while getting location:", error);
        });
    }
        return { weathers, getWeather, getCurrentWeather, currentWeather, isLoading }
    })