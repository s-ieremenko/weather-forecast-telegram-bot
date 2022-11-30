import TelegramBot from 'node-telegram-bot-api'
import axios from 'axios'
import * as dotenv from 'dotenv'

dotenv.config()

const TOKEN = process.env.TELEGRAM_TOKEN
const WEATHER_TOKEN = process.env.API_TOKEN

const bot = new TelegramBot(TOKEN, {
    webHook: {
        port: process.env.PORT
    }
})
bot.setWebHook(`${process.env.URL}/bot${TOKEN}`)

console.log('Telegram bot started...')

const options = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '3 hours', callback_data: 3 }, { text: '6 hours', callback_data: 6 }]
        ]
    })
}

const getData = async () => {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Kyiv&units=metric&cnt=6&appid=${WEATHER_TOKEN}`);
        return response.data

    } catch (e) {
        console.log(e)
    }
}
const groupBy = (list, key) => {
    return list.reduce((acc, currentValue) => {
        let groupKey = currentValue[key];
        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }
        acc[groupKey].push(currentValue);
        return acc;
    }, {});
};

const allData = (arr) => arr.map(item => {
    let { main: { temp, feels_like }, weather, dt_txt } = item
    let roundedTemp = Math.round(temp)
    let roundedFeels_like = Math.round(feels_like)

    const displayedTemp = roundedTemp > 0 ? `+ ${roundedTemp}` : roundedFeels_like
    const description = weather[0].description
    const time = new Date(dt_txt).toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit', hour12: false });

    return `${time}, ${displayedTemp}°C, feels like ${roundedFeels_like}°C, ${description} \n`
})

const start = () => {
    bot.on('message', async msg => {
        const { chat: { id, first_name } } = msg


        return bot.sendMessage(id, `Hi, ${first_name}, let"s start, choose one of the options`, options)


    })

    bot.on('callback_query', async msg => {
        const res = await getData()
        const convertedDate = res.list.map(item => ({ ...item, new_dt_txt: item.dt_txt.split(' ')[0] }))
        const newData = groupBy(convertedDate, 'new_dt_txt')

        let str = ''
        for (let key in newData) {
            const formattedDateWithYear = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(new Date(key))
            const splittedFormattedDate = formattedDateWithYear.split(' ')
            splittedFormattedDate.pop()

            const formattedDateWithoutYear = splittedFormattedDate.join(' ')
            str += `*${formattedDateWithoutYear}*\n${allData(newData[key]).join('')}\n`
        }

        return bot.sendMessage(msg.message.chat.id, str, { parse_mode: 'Markdown' })
    })

}
start()







