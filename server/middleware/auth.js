const jwt = require('jsonwebtoken')

// verificar token
let verificaToken = (req, res, next) => {
    let token = req.get('Authorization');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err
            });
        }
        req.usuario = decoded.usuario;
        next();
    });
};

let verificaRole = (req, res, next) => {
    let usuario = req.usuario;

    if (usuario.ROLE != 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'Usuario no es administrador'
            }
        });
    }

    next();
};

module.exports = {
    verificaToken,
    verificaRole
};