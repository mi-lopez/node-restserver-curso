const express = require('express');
let app = express();

let Categoria = require('../models/categoria');

const {
    verificaToken,
    verificaRole
} = require('../middleware/auth');

app.get('/categoria', verificaToken, (req, res) => {
    // deben aparecer todas las categorias
    Categoria.find({})
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                categorias
            });
        });
});

app.get('/categoria/:id', verificaToken, (req, res) => {
    // debe aparecer una categoría por id
    // findById()...
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'El ID no es correcto'
                }
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});

app.post('/categoria', verificaToken, (req, res) => {
    // debe crear una categoria
    // req.usuario.id (persona que creó la categoría)
    let body = req.body;
    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

app.put('/categoria/:id', verificaToken, (req, res) => {
    // debe actualizar la categoría
    let id = req.params.id;

    Categoria.findByIdAndUpdate(id, { descripcion: req.body.descripcion }, {
        new: true,
        runValidators: true
    }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });
});

app.delete('/categoria/:id', [verificaToken, verificaRole], (req, res) => {
    // solo un administrador
    // findByIdAndRemove()...
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, CategoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true
        });
    });
});

module.exports = app;