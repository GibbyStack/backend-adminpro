const { response } = require('express');
const bcrypt = require('bcryptjs');
const { query, querySingle, execute } = require('../../dal/data-access');

//Obtener docentes
const getDocentes = async(req, res) => {
    let docentes = await query('stp_docentes_getall');
    if (docentes) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: docentes
        });
    } else {
        res.status(400).json({
            status: false,
            message: 'Ocurrio un error al consultar los docentes'
        });
    }
}

//Obtener docente
const getDocente = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idDocente',
        'value': id
    }];

    let docente = await querySingle('stp_docentes_getbyid', sqlParams);
    if (docente) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: docente
        });
    } else {
        res.status(400).json({
            status: false,
            message: 'Ocurrio un error al consultar el docente'
        });
    }
}

//Agregar docente
const addDocente = async(req, res) => {
    const { nombre, edad, titulo, tipo } = req.body;
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'edad',
            'value': edad
        },
        {
            'name': 'titulo',
            'value': titulo
        },
        {
            'name': 'tipo',
            'value': tipo
        }
    ];

    let rowsAffected = await execute('stp_docentes_add', sqlParams);
    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Docente agregado exitosamente',
            data: 1
        });
    } else {
        res.status(400).json({
            status: false,
            message: 'Ocurrio un error al agregar el docente',
        });
    }
}

//Actualizar docente
const updateDocente = async(req, res) => {
    const { id } = req.params;
    const { nombre, edad, titulo, tipo } = req.body;
    const sqlParams = [{
            'name': 'idDocente',
            'value': id
        },
        {
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'edad',
            'value': edad
        },
        {
            'name': 'titulo',
            'value': titulo
        },
        {
            'name': 'tipo',
            'value': tipo
        }
    ];

    let rowsAffected = await execute('stp_docentes_update', sqlParams);

    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Docente actualizado correctamente',
            data: 1
        });
    } else {
        res.status(400).json({
            status: false,
            message: 'Ocurrio un error al actualizar el docente'
        });
    }
}

//Borrar docente
const deleteDocente = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idDocente',
        'value': id
    }];

    let rowsAffected = await execute('stp_docentes_delete', sqlParams);
    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Docente eliminado correctamente',
            data: 1
        });
    } else {
        res.status(400).json({
            status: false,
            message: 'Ocurrio un error al eliminar el docente'
        });
    }
}

module.exports = {
    getDocentes,
    getDocente,
    addDocente,
    updateDocente,
    deleteDocente
}