const path = require('path')
const express = require('express')
const hbs = require('hbs')
const getLocation = require('./utils/geocode')
const getForecast = require('./utils/forecast')



const app = express()

// Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory, files to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res)=>{
    res.render('index',{
        title: "Home page",
        author: "Bibi Bobotest"
    })
})

app.get('/about', (req, res)=>{
    res.render('about',{
        title: "About page",
        author: "Fifi Bobo"
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: "Help page",
        author: "Fifi caca"
    })
})

app.get('/weather', (req, res)=>{

    if(!req.query.adress){
        return res.send({
            error: "You must provide an adress"
        })
    }

    getLocation(req.query.adress,(error, data={})=>{

        if(error){
            return res.send({error})
        }
        getForecast(data.latitude, data.longitude, (error, forecastData)=>{

            if(error){
                return res.send({error})
            }

            const {time, temperature, weather} = forecastData
            const {place_name} = data
            res.send({
                time,
                temperature,
                weather,
                place_name, 
            })
        }) 
    })
})

app.get('/products', (req, res)=>{
    console.log(req.query)
    res.send({
        products:["car","water"]
    })
})

app.get('/help/*', (req, res)=>{
    res.render('helpnotfound',{
        message: 'Page you are looking for doesnt seems to exits',
        author: 'Bartek Z'
    })
})

app.get('*', (req, res)=>{
    res.render('404',{
        message: 'Page not Found',
        author: 'Bartek Z'
    })
})

app.listen(3000, () =>{
    console.log('Server is up on port 3000')
})