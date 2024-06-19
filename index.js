const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 4055
const { sequelize } = require('./src/database/connection')
const path = require('path')
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'src', 'views'));
const { register, create } = require('./src/controllers/auth.controller')

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/register', register)
app.post('/create', create)

app.get('/product/:id', (req, res) => {
    res.render('product.ejs')
})

app.listen(port, async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    console.log('Aplicacion ejecutandose en http://localhost:' + port);
})