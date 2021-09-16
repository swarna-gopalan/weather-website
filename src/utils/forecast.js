const request = require('postman-request')
const fs = require('fs')

const forecast = (latitude, longitude, callback) => {
    let weatherAPIUrl = 'https://api.weatherapi.com/v1/current.json?key=d7eec661952d4f4daba154149212107&q=' + latitude + ',' + longitude + '&aqi=no';
    request
        .get(weatherAPIUrl)
        .on('error', function(error) {
            callback('Unable to connect to weather services', undefined)
        })
        .on("data", (chunk) => {
            const weatherAPIResponse = JSON.parse(chunk.toString())
            if(weatherAPIResponse.error) {
                callback(weatherAPIResponse.error.message, undefined)
            }
            else {
                let message = weatherAPIResponse.current.condition.text + ', It is currently ' + weatherAPIResponse.current.temp_f + 'F out. It feels like ' + weatherAPIResponse.current.feelslike_f + 'F out. '
                message += 'There is ' + weatherAPIResponse.current.precip_in + ' inches rain today.'
                message += ` Expect a wind of ${weatherAPIResponse.current.wind_mph} mph`
                callback(undefined, message)
            }
        });
}
module.exports = forecast