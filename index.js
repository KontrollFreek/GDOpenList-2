const express = require('express')
const fs = require('fs')

const app = express()
const port = 357

// resources
app.use('/css', express.static(__dirname + '/css/'))
app.use('/js', express.static(__dirname + '/js/'))
app.use('/src', express.static(__dirname + '/src/'))

// hard-coded paths
app.get('/', function (req, res) { res.status(200).sendFile(__dirname + "/html/home.html") })
app.get('/level/:id', function (req, res) { res.status(200).sendFile(__dirname + "/html/level.html") })

// hard-coded redirects
app.get('/l/:id', function (req, res) { res.redirect('/level/' + req.params.id) })
app.get('/l', function (req, res) { res.redirect('/level/1') })
app.get('/level', function (req, res) { res.redirect('/level/1') })
app.get('/list', function (req, res) { res.redirect('/') })
app.get('/levels', function (req, res) { res.redirect('/') })

// all pages except for home, 404, and level
fs.readdirSync('html').forEach(f => {
    switch (f.replace('.html', '')) {
        case 'home':
        case '404':
        case 'level':
            break
        default:
            app.get(`/${f.replace('.html', '')}`, function (req, res) { res.status(200).sendFile(__dirname + `/html/${f}`) })
    }
})

// serve the 404 page if all other endpoints fail
app.get('*', function (req, res) {
    res.status(404).sendFile(__dirname + "/html/404.html")
})

// listen on the given port
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})

// used for vercel, exports the app as a node module
module.exports = app