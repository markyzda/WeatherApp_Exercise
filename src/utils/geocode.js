const request = require('request')


const getLocation = (location, callback)=>{
    const url= `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?types=place&access_token=pk.eyJ1Ijoic3ltZXRyaWNzc29sdXRpb25zIiwiYSI6ImNrbThienJtNDE2NnkyeW42aXBrOTM2NGgifQ.Ptuf8ikQaPzXK565OTcQYA`

    request({url:url, json:true}, (error,response)=>{
        if(error){
            callback('Service geo unavaible', undefined)
        }else if(response.body.features.length == 0){
            callback('Couldnt find location', undefined)
        }else{
            callback(undefined, {
                latitude: response.body.features[0].center[0], 
                longitude: response.body.features[0].center[1],
                place_name: response.body.features[0].place_name,
             })
        }
    })
}


module.exports = getLocation