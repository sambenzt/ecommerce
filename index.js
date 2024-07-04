const express = require('express')
const app = express()
const session = require('express-session')
const bodyParser = require('body-parser')
const flash = require('connect-flash');
const port = 4055
const { sequelize } = require('./src/database/connection')
const path = require('path')
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'src', 'views'));
const { register, login, auth, create, profile, logout, test, home, product, addProduct, cart, payment } = require('./src/controllers/auth.controller');
const authMiddleware = require('./src/middleware/auth.middleware');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'd44d4xfjks0sd5as5f05gj14u0da5s54630',
    resave: true,
    saveUninitialized: true
}))

app.use(flash())


app.use((req, res, next) => {
    res.locals.auth = req.session.auth;
    res.locals.cartTotal = req.session.carrito ? req.session.carrito.length : 0;
    next();
});

app.get('/', home)

app.get('/register', register)
app.post('/create', create)
app.get('/login', login)
app.post('/auth', auth)
app.get('/profile', authMiddleware, profile)
app.get('/logout', logout)
app.get('/product/:id', product)
app.post('/add-product', addProduct)
app.get('/cart',authMiddleware, cart)
app.post('/payment', authMiddleware, payment)
app.get('/test', test)

app.listen(port, async () => {
    try {
        await sequelize.authenticate();
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    console.log('Aplicacion ejecutandose en http://localhost:' + port);
})