const jwt = require('jsonwebtoken');
const { generateJWT } = require('../helpers/jwt');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.json({
            status: false,
            message: 'There is no token in the request',
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
            message: 'Invalid token',
            data: null
        });
    }
}

const renewJWT = async(req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.json({
            status: false,
            message: 'There is no token in the request',
            data: null
        });
    }
    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        req.id = id;
        const newtoken = await generateJWT(id);
        return res.json({
            status: true,
            message: 'Valid Token',
            data: newtoken
        });
        next();
    } catch (error) {
        return res.json({
            status: false,
            message: 'Invalid token',
            data: null
        });
    }
}

module.exports = {
    validarJWT,
    renewJWT
}