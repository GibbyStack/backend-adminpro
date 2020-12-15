const jwt = require('jsonwebtoken');
const { getUsuario } = require('../controllers/usuarios');
const { generateJWT } = require('../helpers/jwt');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.json({
            status: false,
            message: 'No hay token en la peticion',
            data: null
        });
    }
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.id = id;
        next();
    } catch (error) {
        return res.json({
            status: false,
            message: 'Token no válido',
            data: null
        });
    }
}

const renewJWT = async(req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.json({
            status: false,
            message: 'No hay token en la peticion',
            data: null
        });
    }
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.id = id;
        const newtoken = await generateJWT(id);
        return res.json({
            status: true,
            message: 'Token válido',
            data: newtoken
        });
        next();
    } catch (error) {
        return res.json({
            status: false,
            message: 'Token no válido',
            data: null
        });
    }
}

const getUsuarioJWT = async(req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.json({
            status: false,
            message: 'No hay token en la peticion',
            data: null
        });
    }
    try {
        const payload = jwt.decode(token, process.env.JWT_SECRET);
        return res.json({
            status: true,
            message: 'Token válido',
            data: payload
        });
        next();
    } catch (error) {
        return res.json({
            status: false,
            message: 'Token no válido',
            data: null
        });
    }
}

module.exports = {
    validarJWT,
    renewJWT,
    getUsuarioJWT
}