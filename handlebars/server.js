const express = require("express")
const handlebars = require('express-handlebars')
const routerProd = express.Router()
const Products = require('./class/class')

const PORT = 8080
const statusOk = 200
const statusCreated = 201
const statusErrClient = 400
const statusNotFound = 404
const statusErrServer = 500

const app = express()
const storProd = new Products() 


app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}))

app.set('view engine', 'hbs')
app.set('views', './views')

app.use(express.urlencoded({extended: true}))
app.use('/productos', routerProd)
app.use(express.json())

app.get('/', (req, res) => {
    res.render('form');
})

routerProd

    .get('/', (req, res) => {

        const listProd = storProd.productsAll      
        
        res.render('table', {listProd});
    })

    .post('/', (req, res) => {

        const newProd = storProd.saveProduct(req.body)

        res.redirect('/');
    }) 


const server = app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`))
server.on('error', (err) => console.log(err.message))