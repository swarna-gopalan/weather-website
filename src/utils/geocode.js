const request = require('postman-request')
const fs = require('fs')

const geocode = (address, callback) => {
    let mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3dhcm5hZyIsImEiOiJja3JpZzZremwwYWlzMnZvYjgxM2ttdW12In0.fAs0EzjIX8SjAoKt4rt4sA&limit=1'
    request
        .get(mapBoxUrl)
        .on('error', function(error) {
            callback('Unable to connect to location services', undefined)
        })
        .on("data", (chunk) => {
            const mapBoxResponse = JSON.parse(chunk.toString())
            if(mapBoxResponse.features.length === 0) {
                callback('Unable to find location. Try a different search term', undefined)
            }
            else {
                callback(undefined, {
                    latitude: mapBoxResponse.features[0].center[1],
                    longitude: mapBoxResponse.features[0].center[0],
                    location: mapBoxResponse.features[0].place_name
                })
            }
        });
}
module.exports = geocode