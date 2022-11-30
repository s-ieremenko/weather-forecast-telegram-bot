const hoursOptions = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '3 hours', callback_data: 3 }, { text: '6 hours', callback_data: 6 }]
        ]
    })
}

const options = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: 'Weather in Kyiv', callback_data: 1 }]
        ]
    })
}

export { options, hoursOptions }