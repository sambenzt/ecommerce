const express = require('express')
const app = express()
const port = 4055
const path = require('path')
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.set('view engine', 'html');
app.set('views',path.join(__dirname, 'src', 'views'));

app.get('/', (req, res) => {
    res.render('home.ejs')
})

app.get('/product/:id', (req, res) => {
    res.render('product.ejs')
})

app.listen(port, () => {
    console.log('Aplicacion ejecutandose en http://localhost:' + port);
})