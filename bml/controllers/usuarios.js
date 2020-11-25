const { response } = require('express');
const bcrypt = require('bcryptjs');
const { query, querySingle, execute } = require('../../dal/data-access');

//Obtener usuarios
const getUsuarios = async(req, res = response) => {
    let usuarios = await query('stp_usuarios_getall');
    if (usuarios) {
        res.json({
            status: true,
            message: 'Consulta exitosa'
        });
    } else {
        res.status(400).json({
            status: false,
            message: 'Ocurrio un error al consultar los usuarios'
        });
    }
}

//Obtener un Usuario
const getUsuario = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'id',
        'value': id
    }];

    let usuario = await querySingle('stp_usuarios_getbyid', sqlParams);
    if (usuario) {
        res.json({
            status: true,
            message: 'Consulta exitosa'
        });
    } else {
        res.status(400).json({
            status: false,
            message: 'Ocurrio un error al consultar el usuario'
        });
    }
}

//Agregar un usuario
const addUsuario = async(req, res) => {
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

    let rowsAffected = await execute('stp_usuarios_add', sqlParams);
    if (rowsAffected) {
        res.json({
            status: true,
            message: 'Usuario agregado exitosamente',
            data: res
        });
    } else {
        res.status(400).json({
            status: false,
            message: 'Ocurrio un error al agregar el usuario',
            data: res
        });
    }
}

//Actualizar Usuario
const updateUsuario = async(req, res) => {
    const { id } = req.params;
    const { nombre, email, password } = req.body;
    const sqlParams = [{
            'name': 'idUsuario',
            'value': id
        },
        {
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
        }
    ];

    let rowsAffected = await execute('stp_usuarios_update', sqlParams);
    if (rowsAffected) {
        res.json({
            status: true,
            message: 'Usuario actualizao correctamente'
        });
    } else {
        res.status(400).json({
            status: false,
            message: 'Ocurrio un error al actualizar el usuario'
        });
    }
}

//Borrar usuarios
const deleteUsuario = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idUsuario',
        'value': id
    }];

    let rowsAffected = await execute('stp_usuarios_delete', sqlParams);
    if (rowsAffected) {
        res.json({
            status: true,
            message: 'Usuario eliminado correctamente'
        });
    } else {
        res.status(400).json({
            status: false,
            message: 'Ocurrio un error al eliminar el usuario'
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