const { query, querySingle, execute } = require('../../dal/data-access');

//Obtener docentes
const getDocentes = async(req, res) => {
    let docentes = await query('stp_docentes_getall');
    if (docentes) {
        res.json({
            status: true,
            message: 'Successful consultation',
            data: docentes
        });
    } else {
        res.json({
            status: false,
            message: 'An error occurred while querying teachers',
            data: null
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
            message: 'Successful consultation',
            data: docente
        });
    } else {
        res.json({
            status: false,
            message: 'An error occurred when consulting the teacher',
            data: null
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
            message: 'Teacher successfully added',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'An error occurred while adding the teacher',
            data: 1
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
            message: 'Teacher successfully updated',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'An error occurred while updating the teacher',
            data: 0
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
            message: 'Teacher successfully removed',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'An error occurred while deleting the teacher',
            dato: 0
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