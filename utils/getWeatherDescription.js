const getWeatherDescription = (arr) => arr.map(item => {
    let { main: { temp, feels_like }, weather, dt_txt } = item
    let roundedTemp = Math.round(temp)
    let roundedFeels_like = Math.round(feels_like)

    const displayedTemp = roundedTemp > 0 ? `+ ${roundedTemp}` : roundedFeels_like
    const description = weather[0].description
    let time = new Date(dt_txt).toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit', hour12: false });
    if (time === '24:00') {
        time = '00:00'
    }

    return `${time}, ${displayedTemp}°C, feels like ${roundedFeels_like}°C, ${description} \n`
})

export default getWeatherDescription