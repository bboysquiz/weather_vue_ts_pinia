import { defineStore } from 'pinia';
import { reactive } from 'vue';
import axios, { AxiosResponse } from 'axios'

interface Data {
    weathers: WeatherData[],
    lon: number | null,
    lat: number | null,
    isLoading: boolean,
    currentWeather: WeatherData | null
}

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


const data: Data = reactive({
    weathers: [],
    lon: null,
    lat: null,
    isLoading: false,
    currentWeather: null,
});


export const useWeatherStore = defineStore('weathers', () => {
    const getWeather = async (cityName: string): Promise<void> => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=67c859d5010465976e7b3e885122af9a&units=metric`;
            const response: AxiosResponse<WeatherData> = await axios.get(url);
            data.weathers = [...data.weathers, response.data];
            console.log(data.weathers)
        } catch (error) {
            console.error(error);
        }
    };
    const getCurrentWeather = async (): Promise<void> => {
        data.isLoading = true
        navigator.geolocation.getCurrentPosition(async function (position) {
            data.lon = position.coords.longitude
            data.lat = position.coords.latitude
            console.log("Latitude:", data.lat, "Longitude:", data.lon);
            try {
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${data.lat}&lon=${data.lon}&appid=67c859d5010465976e7b3e885122af9a`;
                const response: AxiosResponse<WeatherData> = await axios.get(url);
                data.currentWeather = response.data
                console.log(data.currentWeather)
                data.isLoading = false
            } catch (error) {
                console.error(error);
            }
        }, function (error) {
            console.error("Error occurred while getting location:", error);
        });
    }
    const deleteItem = (id: number): void => {
        data.weathers = data.weathers.filter(item => item.id !== id)
    }
        return { data, getWeather, getCurrentWeather, deleteItem }
    }, {
        persist: true
    })