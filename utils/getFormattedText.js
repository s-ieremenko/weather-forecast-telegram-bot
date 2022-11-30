import getWeatherDescription from "./getWeatherDescription.js";

const getFormattedText = (obj) => {
    return Object.keys(obj).reduce((acc, item) => {
        const formattedDateWithYear = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(new Date(item))
        const splittedFormattedDate = formattedDateWithYear.split(' ')
        splittedFormattedDate.pop()

        const formattedDateWithoutYear = splittedFormattedDate.join(' ')

        return acc + `*${formattedDateWithoutYear}*\n${getWeatherDescription(obj[item]).join('')}\n`

    }, '')

}

export default getFormattedText