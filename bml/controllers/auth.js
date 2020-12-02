const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { querySingle } = require('../../dal/data-access');


const login = async(req, res) => {
    const { email, password } = req.body;
    let usuario = null;
    const sqlParams = [{
        'name': 'email',
        'value': email
    }];

    usuario = await querySingle('stp_usuarios_login', sqlParams);

    if (!usuario) {
        res.json({
            status: false,
            message: 'Email no encontrado',
            data: null
        });
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
        res.json({
            status: false,
            message: 'Contraseña incorrecta',
            data: null
        });
    }

    const token = await generateJWT(usuario.id);

    res.json({
        status: true,
        message: 'Acceso correcto',
        data: token
    });
}

module.exports = {
    login
}