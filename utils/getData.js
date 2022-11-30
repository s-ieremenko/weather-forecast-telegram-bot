import axios from "axios";

import * as dotenv from 'dotenv'

dotenv.config()

const WEATHER_TOKEN = process.env.API_TOKEN
const WEATHER_URL = process.env.API_URL

const getData = async () => {
    try {
        const response = await axios.get(`${WEATHER_URL}${WEATHER_TOKEN}`);
        return response.data

    } catch (e) {
        console.log(e)
    }
}

export default getData