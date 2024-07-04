const User = require("../database/models/User")
const Order = require("../database/models/Order")
const OrderItem = require("../database/models/OrderItem")
const Product = require("../database/models/Product")
const {sequelize} = require('../database/connection')

const home = async (req, res) => {
    const products = await Product.findAll({order: [['name', 'ASC']]})
    res.render('home.ejs', {products})
}
const product = async (req, res) => {
    const product = await Product.findByPk(req.params.id)
    res.render('product.ejs', {product})
}


const register = async (req, res) => {
    res.render('register.ejs', {error: null})
}

const login = async (req, res) => {
    res.render('login.ejs', {error: null})
}

const auth = async (req, res) => {

    const query = `SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`

    const [results] = await sequelize.query(query);

    if(results.length === 0) {
        return res.render('login.ejs', {error: 'usuario o contraseña incorrectos'})
    }

    req.session.auth = results[0]

    
    res.redirect('/')
}

const profile = async (req, res) => {
    res.render('profile.ejs', {user: req.session.auth})
}

const logout = async (req, res) => {
    req.session.destroy()
    res.redirect('/login')
}

const create = async (req, res) => {
    const { email, location, password } = req.body

    if(!email || !location || !password) {
        return res.render('register.ejs', {error: 'todos los campos son obligatorios'})
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const esValido = emailRegex.test(email);

    if(!esValido) {
        return res.render('register.ejs', {error: 'el email es invalido'})
    }

    const existe = await User.findOne({where: {email: email}})

    if(existe) {
        return res.render('register.ejs', {error: 'el email ya esta registrado'})
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    const esPassValida = passwordRegex.test(password);

    if(!esPassValida) {
        return res.render('register.ejs', {error: 'la contraseña no cumple el formato requerido'})
    }

    const user = new User({ email, location, password })
    await user.save()
    res.redirect('/')
}

const test = async (req, res) => {
    res.render('cart.ejs')
}

const addProduct = (req, res) => {
    const { id } = req.body
    if(!req.session.carrito || req.session.carrito.length === 0) {
        req.session.carrito = [id]
    }
    else {
        req.session.carrito.push(id)
    }

    const total = req.session.carrito.length
    
    res.send({"message": "producto agregado", "total": total})
}

const cart = async (req, res) => {

    let allProducts = []
    let total = 0

    if(!req.session.carrito) {
       return res.render('cart.ejs', {allProducts: []})
    }

    for(let i = 0; i < req.session.carrito.length; i++) {
        const id = req.session.carrito[i]
        const product = await Product.findByPk(id)
        total = total + parseFloat(product.price)
        allProducts.push(product)
    }

    res.render('cart.ejs', {allProducts: allProducts, total: total})
}

const payment = async (req, res) => {
    let total = 0

    for(let i = 0; i < req.session.carrito.length; i++) {
        const id = req.session.carrito[i]
        const product = await Product.findByPk(id)
        total = total + parseFloat(product.price)
    }

    const order = await Order.create({
        user_id: req.session.auth.id,
        created_at: new Date(),
        total: total
    })

    for(let i = 0; i < req.session.carrito.length; i++) {
        const id = req.session.carrito[i]
        const product = await Product.findByPk(id)
        OrderItem.create({
            order_id: order.id,
            product_id: product.id,
            price: product.price,
            quantity: 1,
        })
    }

    req.session.carrito = []

    res.send({message: "pago exitoso"})
}


module.exports = {
    home,
    product,
    register,
    login,
    create,
    auth,
    profile,
    logout,
    addProduct,
    cart,
    payment,
    test
}