export const options = {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{ text: '3 hours', callback_data: 3 }, { text: '6 hours', callback_data: 6 }]
        ]
    })
}