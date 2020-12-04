const Router = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { getUsuarios, getUsuario, addUsuario, updateUsuario, deleteUsuario } = require('../bml/controllers/usuarios')
const { validarJWT } = require('../bml/middlewares/validar-jwt');

const router = Router();

//GetAll
router.get('/', getUsuarios);

//Getbyid
router.get('/:id', getUsuario);

//Add
router.post('/', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').not().isEmpty(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos
    ],
    addUsuario);

//Update
router.put('/', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').not().isEmpty(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos
    ],
    updateUsuario);

//Delete
router.delete('/:id', deleteUsuario);

module.exports = router;