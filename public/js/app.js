const form = document.querySelector('form')
const input = document.querySelector('input')

const paragraphCity = document.getElementById('city')
const paragraphForecast = document.getElementById('forecast')



const userMessage = (message, message_2 = null) =>{
    paragraphCity.textContent = message

    if(message_2){
        paragraphForecast.textContent = message_2
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    paragraphCity.textContent = "Loading...."

    if(input.value.length < 3){
        userMessage('3 letters atleast')
        return 
    }
 
    fetch(`/weather?adress=${input.value}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                userMessage(data.error)
                return 
            }
            userMessage(`Currently at ${data.place_name}`, `there is ${data.temperature} degrees, ${data.weather}`)
        })
    })
})