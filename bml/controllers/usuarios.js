const bcrypt = require('bcryptjs');
const { query, querySingle, execute } = require('../../dal/data-access');

//Obtener usuarios
const getUsuarios = async(req, res) => {
    let usuarios = await query('stp_usuarios_getall');
    if (usuarios) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: usuarios
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al consultar los usuarios',
            data: null
        });
    }
}

//Obtener usuario
const getUsuario = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idUsuario',
        'value': id
    }];

    let usuario = await querySingle('stp_usuarios_getbyid', sqlParams);
    if (usuario) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: usuario
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al consultar el usuario',
            data: null
        });
    }
}

//Agregar usuario
const addUsuario = async(req, res) => {
    const { nombre, email, password } = req.body;
    const salt = bcrypt.genSaltSync();
    const newPassword = bcrypt.hashSync(password, salt);
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'email',
            'value': email
        },
        {
            'name': 'password',
            'value': newPassword
        },
        {
            'name': 'google',
            'value': 0
        },
        {
            'name': 'facebook',
            'value': 0
        },
        {
            'name': 'nativo',
            'value': 1
        },
        {
            'name': 'picture',
            'value': ''
        }
    ];
    const sqlParams1 = [{
        'name': 'email',
        'value': email
    }]

    let usuario = await querySingle('stp_usuarios_login', sqlParams1);
    if (!usuario) {
        usuario = await querySingle('stp_usuarios_add', sqlParams);
        if (usuario) {
            res.json({
                status: true,
                message: 'Usuario agregado exitosamente',
                data: usuario
            });
        } else {
            res.json({
                status: false,
                message: 'Ocurrio un error al agregar el usuario',
                data: null
            });
        }
    } else {
        res.json({
            status: false,
            message: 'Ya existe un usuario con ese email',
            data: null
        })
    }
}

//Actualizar usuario
const updateUsuario = async(req, res) => {
    const { nombre, email, password } = req.body;
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'email',
            'value': email
        },
        {
            'name': 'password',
            'value': password
        },
        {
            'name': 'google',
            'value': 0
        },
        {
            'name': 'facebook',
            'value': 0
        },
        {
            'name': 'nativo',
            'value': 1
        },
        {
            'name': 'picture',
            'value': ''
        }
    ];

    let rowsAffected = await execute('stp_usuarios_update', sqlParams);

    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Usuario actualizado correctamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al actualizar el usuario',
            data: 0
        });
    }
}

//Borrar usuario
const deleteUsuario = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idUsuario',
        'value': id
    }];

    let rowsAffected = await execute('stp_usuarios_delete', sqlParams);
    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Usuario eliminado correctamente',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al eliminar el usuario',
            data: 0
        });
    }
}

module.exports = {
    getUsuarios,
    getUsuario,
    addUsuario,
    updateUsuario,
    deleteUsuario
}