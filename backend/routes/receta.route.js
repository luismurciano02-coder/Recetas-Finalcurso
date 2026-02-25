const express = require('express');
const  recetaCtrl = require('../controllers/receta.controller');
const router = express.Router();

router.get('/', recetaCtrl.getRecetas);
router.get('/paginate', recetaCtrl.getRecetasPaginadas);
router.get('/receta/:id', recetaCtrl.getReceta);
router.post('/anadir', recetaCtrl.addReceta);
router.put('/actualizar/:id', recetaCtrl.updateReceta);
router.delete('/:id', recetaCtrl.deleteReceta);

router.get('/categorias', recetaCtrl.getCategorias); 

module.exports = router;