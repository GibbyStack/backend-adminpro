const { query, querySingle, execute } = require('../../dal/data-access');

//Obtener alumnos
const getAlumnos = async(req, res) => {
    let alumnos = await query('stp_alumnos_getall');
    if (alumnos) {
        res.json({
            status: true,
            message: 'Successful consultation',
            data: alumnos
        });
    } else {
        res.json({
            status: false,
            message: 'An error occurred while querying students',
            data: null
        });
    }
}

//Obtener alumno
const getAlumno = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idAlumno',
        'value': id
    }];

    let alumno = await querySingle('stp_alumnos_getbyid', sqlParams);
    if (alumno) {
        res.json({
            status: true,
            message: 'Successful consultation',
            data: alumno
        });
    } else {
        res.json({
            status: false,
            message: 'An error occurred while querying the student.',
            data: null
        });
    }
}

//Agregar alumno
const addAlumno = async(req, res) => {
    const { nombre, edad, sexo, semestre, carrera } = req.body;
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'edad',
            'value': edad
        },
        {
            'name': 'sexo',
            'value': sexo
        },
        {
            'name': 'semestre',
            'value': semestre
        },
        {
            'name': 'carrera',
            'value': carrera
        }
    ];

    let rowsAffected = await execute('stp_alumnos_add', sqlParams);

    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Student added successfully',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'An error occurred while adding the student',
            data: 0
        });
    }
}

//Actualizar alumno
const updateAlumno = async(req, res) => {
    const { id } = req.params;
    const { nombre, edad, sexo, semestre, carrera } = req.body;
    const sqlParams = [{
            'name': 'idAlumno',
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
            'name': 'sexo',
            'value': sexo
        },
        {
            'name': 'semestre',
            'value': semestre
        },
        {
            'name': 'carrera',
            'value': carrera
        }
    ];

    let rowsAffected = await execute('stp_alumnos_update', sqlParams);

    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Student updated successfully',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'An error occurred while updating the student',
            data: 0
        });
    }
}

//Borrar alumno
const deleteAlumno = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idAlumno',
        'value': id
    }];

    let rowsAffected = await execute('stp_alumnos_delete', sqlParams);
    if (rowsAffected) {
        res.json({
            status: true,
            message: 'Student successfully eliminated',
            data: 1
        });
    } else {
        res.json({
            status: false,
            message: 'An error occurred while deleting the student',
            data: 0
        });
    }
}

module.exports = {
    getAlumnos,
    getAlumno,
    addAlumno,
    updateAlumno,
    deleteAlumno
}