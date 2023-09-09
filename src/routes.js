const Router = require('express');

const medicoController = require('./app/controllers/medicoController');
const gestorController = require('./app/controllers/gestorController');
const pacienteController = require('./app/controllers/pacienteController');
const atestadoController = require('./app/controllers/atestadoControllerGestor');
const { authMiddlewareGestao } = require('./app/database/middlewares/auth-middleware-gestor copy');
const { authMiddlewareMedico } = require('./app/database/middlewares/auth-middleware-medico')
const router = Router()

// medico
router.post('/medico/cadastro', authMiddlewareGestao, medicoController.store);
router.get('/medico/getall', authMiddlewareGestao, medicoController.show);
router.put('/medico/:id', authMiddlewareGestao, medicoController.update);
router.delete('/medico/:id', authMiddlewareGestao, medicoController.delete);
router.get('/medico/getonly', authMiddlewareGestao, medicoController.showOnly);
router.post('/medico/sigin', medicoController.sigin);

// gestor
router.post('/gestor/cadastro', gestorController.store);
router.get('/gestor/getall', gestorController.show);
router.put('/gestor/:id', gestorController.update);
router.delete('/gestor/:id', gestorController.delete);
router.post('/gestor/sigin', gestorController.sigin);

// paciente
router.post('/paciente/cadastro', authMiddlewareGestao, pacienteController.store);
router.get('/paciente/getall', authMiddlewareGestao, pacienteController.show);
router.put('/paciente/:id', authMiddlewareGestao, pacienteController.update);
router.delete('/paciente/:id', authMiddlewareGestao, pacienteController.delete);
router.get('/paciente/getonly', authMiddlewareGestao, pacienteController.showOnly);

// atestadoGestor
router.post('/atestado/cadastro', authMiddlewareGestao, atestadoController.store);
router.get('/atestado/getall', authMiddlewareGestao, atestadoController.show);
router.put('/atestado/:id', authMiddlewareGestao, atestadoController.update);
router.delete('/atestado/:id', authMiddlewareGestao, atestadoController.delete);
router.get('/atestado/getonly', authMiddlewareGestao, atestadoController.showOnly);

// atestadoMedico
router.post('/atestado/cadastro', authMiddlewareMedico, atestadoController.store);
router.get('/atestado/getall', authMiddlewareMedico, atestadoController.show);
router.put('/atestado/:id', authMiddlewareMedico, atestadoController.update);
router.delete('/atestado/:id', authMiddlewareMedico, atestadoController.delete);
router.get('/atestado/getonly', authMiddlewareMedico, atestadoController.showOnly);

module.exports = router;