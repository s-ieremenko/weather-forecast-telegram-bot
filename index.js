import TelegramBot from 'node-telegram-bot-api'
import { options } from "./options.js";
import * as dotenv from 'dotenv'
import getData from "./utils/getData.js";
import groupDataByDate from "./utils/groupDataByDate.js";
import getWeatherDescription from './utils/getWeatherDescription.js'

dotenv.config()

const TOKEN = process.env.TELEGRAM_TOKEN


const bot = new TelegramBot(TOKEN, {
    webHook: {
        port: process.env.PORT
    }
})
bot.setWebHook(`${process.env.URL}/bot${TOKEN}`)

console.log('Telegram bot started...')

const start = () => {
    bot.on('message', async msg => {
        const { chat: { id, first_name } } = msg

        return bot.sendMessage(id, `Hi, ${first_name}, let"s start, choose one of the options`, options)

    })

    bot.on('callback_query', async msg => {
        const res = await getData()
        let listWithConvertedDate = res.list.map(item => ({ ...item, new_dt_txt: item.dt_txt.split(' ')[0] }))

        if (msg.data === '6') {
            listWithConvertedDate = listWithConvertedDate.filter((item, index) => index % 2 !== 0)
        }
        const groupedData = groupDataByDate(listWithConvertedDate, 'new_dt_txt')

        let text = ''

        for (let key in groupedData) {
            const formattedDateWithYear = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(new Date(key))
            const splittedFormattedDate = formattedDateWithYear.split(' ')
            splittedFormattedDate.pop()

            const formattedDateWithoutYear = splittedFormattedDate.join(' ')
            text += `*${formattedDateWithoutYear}*\n${getWeatherDescription(groupedData[key]).join('')}\n`
        }

        return bot.sendMessage(msg.message.chat.id, text, { parse_mode: 'Markdown' })
    })

}
start()







