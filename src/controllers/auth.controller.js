const User = require("../database/models/User")

const register = async (req, res) => {
    res.render('register.ejs')
}

const create = async (req, res) => {
    const { email, location, password } = req.body
    const user = new User({ email, location, password })
    await user.save()
    res.redirect('/')
}

module.exports = {
    register,
    create
}