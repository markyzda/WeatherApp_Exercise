const request = require('request')


const getForecast = (latitude, longitude, callback) =>{

    const url = `http://api.weatherstack.com/current?access_key=8c2baee5cbdba822019e09df283ccf26&query=${longitude},${latitude}`

    request({url: url, json: true}, (error,response)=>{
        if(error){
            callback('Service unavaible', undefined)
        }else if(response.body.error){
            callback('Try other location', undefined)
        }else{
            callback(undefined, {
                time: response.body.current.observation_time,
                temperature: response.body.current.temperature,
                weather: response.body.current.weather_descriptions[0],
            })
        }
    })
//Sprawdź co się stanie jeżeli damy return 

}





module.exports = getForecast