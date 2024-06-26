const User = require("../database/models/User")
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

    
    res.redirect('/profile')
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
    res.send(await User.findAll())
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
    test
}