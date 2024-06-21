const User = require("../database/models/User")

const register = async (req, res) => {
    res.render('register.ejs', {error: null})
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
    register,
    create,
    test
}