const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// define paths for express config
const publicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
// set up static directory to serve
app.use(express.static(publicDirPath))

// Set up handle bar engines and views path
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather App',
        name: 'Swarna'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Weather App',
        name: 'Swarna'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title : 'Help',
        message: 'Refer this for any help',
        name: 'Swarna'
    })
})

app.get('/help/*', (req, res) => {
    res.render('pageNotFound', {
        title : '404',
        errorText: 'Help article not found',
        name: 'Swarna'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'you must provide a address'
        })
    } else {
        geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
            if (error) {
                res.send({ error })
            } 
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    res.send({ error })
                } 
                res.send({
                    forecast : forecastData,
                    location,
                    address: req.query.address
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'you must provide a search term'
        })
    } else {
        res.send({
            products: []
        })
    }
})

app.get('*', (req, res) => {
    res.render('pageNotFound', {
        title : '404',
        errorText: 'Page Not Found',
        name: 'Swarna'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})