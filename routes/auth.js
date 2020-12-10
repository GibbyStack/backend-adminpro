const { Router } = require('express');
const { login, googleSignIn } = require('../bml/controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { renewJWT } = require('../bml/middlewares/validar-jwt');

const router = Router();

//Login
router.post('/', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login);

router.post('/google', [
        check('token', 'El token de google es obligatorio').not().isEmpty(),
        validarCampos
    ],
    googleSignIn);

router.get('/renew', renewJWT);

module.exports = router;