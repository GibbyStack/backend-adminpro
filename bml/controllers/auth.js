const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { querySingle } = require('../../dal/data-access');
const { googleVerify } = require('../helpers/google-verify');

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
        data: token,
        user: usuario
    });
}

const googleSignIn = async(req, res) => {
    const googleToken = req.body.token;
    let usuario = null;
    let sqlParams = null;

    try {
        const { name, email, picture } = await googleVerify(googleToken);
        sqlParams = [{
            'name': 'email',
            'value': email
        }];
        usuario = await querySingle('stp_usuarios_login', sqlParams);
        //verificasr si existe en BD
        if (!usuario) {
            //crear usuario
            sqlParams = [{
                    'name': 'nombre',
                    'value': name
                },
                {
                    'name': 'email',
                    'value': email
                },
                {
                    'name': 'password',
                    'value': ''
                },
                {
                    'name': 'google',
                    'value': 1
                },
                {
                    'name': 'facebook',
                    'value': 0
                },
                {
                    'name': 'nativo',
                    'value': 0
                },
                {
                    'name': 'picture',
                    'value': picture
                },
            ];
            usuario = await querySingle('stp_usuarios_add', sqlParams);
        } else {
            //actualizar usuario
            sqlParams = [{
                    'name': 'nombre',
                    'value': usuario.name
                },
                {
                    'name': 'email',
                    'value': usuario.email
                },
                {
                    'name': 'password',
                    'value': usuario.password
                },
                {
                    'name': 'google',
                    'value': 1
                },
                {
                    'name': 'facebook',
                    'value': 0
                },
                {
                    'name': 'nativo',
                    'value': 0
                },
                {
                    'name': 'picture',
                    'value': usuario.picture
                },
            ];
            usuario = await querySingle('stp_usuarios_update', sqlParams);
        }
        const token = await generateJWT(usuario.idUsuario);
        res.json({
            status: true,
            message: 'Acceso por google correcto',
            data: token,
            user: usuario
        });
    } catch (err) {
        res.json({
            status: false,
            message: 'Acceso por google incorrecto',
            data: err
        });
    }
}

module.exports = {
    login,
    googleSignIn
}