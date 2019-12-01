require('./config/config');

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.get('/usuario', function(req, res) {
    res.json({
        'nombre': 'Miguel López',
        'edad': 33
    });
})

app.post('/usuario', function(req, res) {

    if (req.body.nombre === undefined) {
        res.status(401).json({
            'ok': false,
            'mensaje': 'Falta nombre de usuario'
        });
    }
    res.json({
        'usuario': req.body
    });
})

app.listen(process.env.PORT, () => {
    console.log(`Escuchando puerto ${process.env.PORT}`);
});