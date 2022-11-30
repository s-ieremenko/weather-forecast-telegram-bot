import axios from "axios";

import * as dotenv from 'dotenv'

dotenv.config()

const WEATHER_TOKEN = process.env.API_TOKEN

const getData = async () => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Kyiv&units=metric&cnt=6&appid=${WEATHER_TOKEN}`);
        return response.data

    } catch (e) {
        console.log(e)
    }
}

export default getData