const bcrypt = require('bcryptjs');
const { query, querySingle, execute } = require('../../dal/data-access');

//Obtener usuarios
const getUsuarios = async(req, res) => {
    let usuarios = await query('stp_usuarios_getall');
    if (usuarios) {
        res.json({
            status: true,
            message: 'Successful consultation',
            data: usuarios
        });
    } else {
        res.json({
            status: false,
            message: 'An error occurred while querying users',
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
            message: 'Successful consultation',
            data: usuario
        });
    } else {
        res.json({
            status: false,
            message: 'An error occurred while querying the user',
            data: null
        });
    }
}

//Agregar usuario
const addUsuario = async(req, res) => {
    const { nombre, email, password } = req.body;
    const sqlParams1 = [{
        'name': 'email',
        'value': email
    }]

    let usuario = await querySingle('stp_usuarios_login', sqlParams1);
    if (!usuario) {
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
                'value': null
            }
        ];
        usuario = await querySingle('stp_usuarios_add', sqlParams);
        if (usuario) {
            res.json({
                status: true,
                message: 'User added successfully',
                data: usuario
            });
        } else {
            res.json({
                status: false,
                message: 'An error occurred while adding the user',
                data: null
            });
        }
    } else {
        res.json({
            status: false,
            message: 'There is already a user with that email',
            data: null
        })
    }
}

//Actualizar usuario
const updateUsuario = async(req, res) => {
    const { nombre, email, password, picture } = req.body;

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
            'value': picture
        }
    ];

    let rowsAffected = await execute('stp_usuarios_update', sqlParams);

    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'User updated successfully',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'An error occurred while updating the user',
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
            message: 'User deleted successfully',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'An error occurred while deleting the user',
            data: 0
        });
    }
}

const changePassword = async(req, res) => {
    const { email, password } = req.body;
    const sqlParam = [{
        'name': 'email',
        'value': email
    }]
    let usuario = await querySingle('stp_usuarios_login', sqlParam)
    if (usuario) {
        const salt = bcrypt.genSaltSync();
        const newPassword = bcrypt.hashSync(password, salt);
        const sqlParams = [{
                'name': 'email',
                'value': email
            },
            {
                'name': 'password',
                'value': newPassword
            }
        ]

        let rowsAffected = await execute('stp_usuarios_changePassword', sqlParams);
        if (rowsAffected != 0) {
            res.json({
                status: true,
                message: 'Password updated successfully',
                data: 1
            });
        } else {
            res.json({
                status: false,
                message: 'An error occurred while updating the password',
                data: 0
            });
        }
    } else {
        res.json({
            status: false,
            message: 'There is no user with that email',
            data: null
        })
    }

}

module.exports = {
    getUsuarios,
    getUsuario,
    addUsuario,
    updateUsuario,
    deleteUsuario,
    changePassword
}