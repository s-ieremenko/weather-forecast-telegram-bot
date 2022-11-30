import TelegramBot from 'node-telegram-bot-api'
import { options, hoursOptions } from "./options.js";
import * as dotenv from 'dotenv'

import getData from "./utils/getData.js";
import groupDataByDate from "./utils/groupDataByDate.js";
import getFormattedText from './utils/getFormattedText.js'

dotenv.config()

const TOKEN = process.env.TELEGRAM_TOKEN

const bot = new TelegramBot(TOKEN, {
    webHook: {
        port: process.env.PORT
    }
})
bot.setWebHook(`${process.env.URL_FOR_DEPLOY}/bot${TOKEN}`)

console.log('Telegram bot started...')

const start = () => {
    bot.on('message', async msg => {
        const { chat: { id, first_name } } = msg

        return bot.sendMessage(id, `Hi, ${first_name}, let"s start`, options)

    })

    bot.on('callback_query', async msg => {
        const { message: { chat: { id } }, data } = msg
        if (data === '1') {
            return bot.sendMessage(id, `choose option`, hoursOptions)
        }

        const res = await getData()
        let listWithConvertedDate = res.list.map(item => ({ ...item, new_dt_txt: item.dt_txt.split(' ')[0] }))

        if (data === '6') {
            listWithConvertedDate = listWithConvertedDate.filter((item, index) => index % 2 !== 0)
        }
        const groupedData = groupDataByDate(listWithConvertedDate, 'new_dt_txt')

        const text = getFormattedText(groupedData)

        return bot.sendMessage(id, text, { parse_mode: 'Markdown' })
    })

}
start()







