import getWeatherDescription from "./getWeatherDescription.js";

const getFormattedText = (obj) => {
    let text = ''
    for (const key in obj) {
        const formattedDateWithYear = new Intl.DateTimeFormat('en-GB', { dateStyle: 'full' }).format(new Date(key))
        const splittedFormattedDate = formattedDateWithYear.split(' ')
        splittedFormattedDate.pop()

        const formattedDateWithoutYear = splittedFormattedDate.join(' ')
        text += `*${formattedDateWithoutYear}*\n${getWeatherDescription(obj[key]).join('')}\n`
    }
    return text

}
export default getFormattedText