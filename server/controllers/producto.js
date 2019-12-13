const express = require('express');
let app = express();
const {
    verificaToken
} = require('../middleware/auth');
const Producto = require('../models/producto');

app.get('/producto', verificaToken, (req, res) => {
    let desde = req.query.desde ||  0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({
            disponible: true
        })
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .skip(desde)
        .limit(limite)
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Producto.count({
                disponible: true
            }, (err, conteo) => {
                res.json({
                    ok: true,
                    productos,
                    conteo
                });
            })

        });
});

app.post('/producto', verificaToken, (req, res) => {
    let body = req.body;

    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria
    });

    producto.save((err, productoDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productoDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.status(201).json({
            ok: true,
            producto: productoDB
        });
    });
});

app.delete('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Producto.findByIdAndUpdate(id, {
        disponible: false
    }, {
        new: true,
        runValidators: true
    }, (err, productoDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto: productoDB
        });
    });
});

app.get('/producto/buscar/:search', verificaToken, (req, res) => {

    let search = req.params.search;

    let regex = new RegExp(search, 'i');

    Producto.find({
            nombre: regex
        })
        .populate('usuario', 'nombre email')
        .populate('categoria', 'descripcion')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Producto.count({
                disponible: true
            }, (err, conteo) => {
                res.json({
                    ok: true,
                    productos,
                    conteo
                });
            })
        });
});

module.exports = app;