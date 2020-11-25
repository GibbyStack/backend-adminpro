const { response } = require('express');
const sql = require('mssql');
const conString = require('./config');

//Query Selects GetAll
const query = async(stpName, sqlParams) => {
    sql.on('error', err => {
        console.log(err);
        response.json({
            ok: false,
            message: 'Error',
            error: err
        });
    });

    const pool = await sql.connect(conString);
    const req = await pool.request();
    if (typeof sqlParams !== 'undefined') {
        sqlParams.forEach((param) => {
            req.input(param.name, param.value);
        });
    }
    const resp = await req.execute(stpName);
    return resp.recordset;
}



//QuerySingle Getby
const querySingle = async(stpName, sqlParams) => {
    sql.on('error', err => {
        console.log(err);
        response.json({
            status: false,
            message: 'Error en la conexion a la BD',
            data: err
        });
    });

    const pool = await sql.connect(conString);
    const req = await pool.request();
    if (typeof sqlParams !== 'undefined') {
        sqlParams.forEach((param) => {
            req.input(param.name, param.value);
        });
    }
    const resp = await req.execute(stpName);
    return resp.recorset[0];
}

//Execute consultas
const execute = async(stpName, sqlParams) => {
    sql.on('error', err => {
        console.log(err);
        response.json({
            status: false,
            message: 'Error en la conexion a la BD',
            data: err
        });
    });

    const pool = await sql.connect(conString);
    const req = await pool.request();
    if (typeof sqlParams !== 'undefined') {
        sqlParams.forEach((param) => {
            req.input(param.name, param.value);
        });
    }
    const resp = await req.execute(stpName);
    return resp.rowsAffected;
}

module.exports = {
    query,
    querySingle,
    execute
}