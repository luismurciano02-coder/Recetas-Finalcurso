const Receta = require('../models/receta.model');
const recetaCtrl = {};

const validarBodyReceta = (body) => {
    const errores = {};

    if (!body || typeof body !== 'object') {
        return { body: 'El body es obligatorio y debe ser un objeto JSON' };
    }

    if (!body.nombre || !String(body.nombre).trim()) {
        errores.nombre = 'El campo nombre es obligatorio';
    }

    if (!body.descripcion || !String(body.descripcion).trim()) {
        errores.descripcion = 'El campo descripcion es obligatorio';
    }

    if (!body.ingredientes || !String(body.ingredientes).trim()) {
        errores.ingredientes = 'El campo ingredientes es obligatorio';
    }

    if (!body.instrucciones || !String(body.instrucciones).trim()) {
        errores.instrucciones = 'El campo instrucciones es obligatorio';
    }

    if (!Array.isArray(body.categorias) || body.categorias.length === 0) {
        errores.categorias = 'El campo categorias es obligatorio y debe tener al menos una categoria';
    } else if (body.categorias.some((cat) => !String(cat || '').trim())) {
        errores.categorias = 'Todas las categorias deben contener texto';
    }

    if (!body.valoracion || typeof body.valoracion !== 'object') {
        errores.valoracion = 'El campo valoracion es obligatorio';
    } else {
        if (body.valoracion.puntuacion === undefined || body.valoracion.puntuacion === null || Number.isNaN(Number(body.valoracion.puntuacion))) {
            errores.puntuacion = 'El campo valoracion.puntuacion es obligatorio y debe ser numerico';
        }

        if (body.valoracion.votos === undefined || body.valoracion.votos === null || Number.isNaN(Number(body.valoracion.votos))) {
            errores.votos = 'El campo valoracion.votos es obligatorio y debe ser numerico';
        }
    }

    return errores;
};

//Funciones CRUD

// Obtener todas las recetas
recetaCtrl.getRecetas = async (req, res) => {
    const recetas = await Receta.find()
        .then((data)=>res.status(200).json({status:data}))
        .catch((err)=>res.status(400).json({status:err}));
};

// Obtener recetas paginadas
recetaCtrl.getRecetasPaginadas = async (req, res) => {
    try {
        const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
        const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 50);
        const categoria = req.query.categoria ? String(req.query.categoria).trim() : '';
        const q = req.query.q ? String(req.query.q).trim() : '';

        const filtro = {};

        if (categoria) {
            filtro.categorias = categoria;
        }

        if (q) {
            filtro.$or = [
                { nombre: { $regex: q, $options: 'i' } },
                { descripcion: { $regex: q, $options: 'i' } },
            ];
        }

        const total = await Receta.countDocuments(filtro);
        const totalPages = Math.max(Math.ceil(total / limit), 1);
        const safePage = Math.min(page, totalPages);
        const skip = (safePage - 1) * limit;

        const data = await Receta.find(filtro)
            .sort({ _id: -1 })
            .skip(skip)
            .limit(limit);

        return res.status(200).json({
            status: data,
            pagination: {
                page: safePage,
                limit,
                total,
                totalPages,
                count: data.length,
            },
            filters: {
                categoria,
                q,
            },
        });
    } catch (err) {
        return res.status(400).json({ status: err.message || err });
    }
};

// Obtener una receta por ID
recetaCtrl.getReceta = async (req, res) => {
    const receta = await Receta.findById(req.params.id)
        .then(data=>
        {
            if(data!=null) res.status(200).json({status:data});
            else res.status(404).json({status:'Receta not found'})
        })
        .catch((err)=>res.status(400).json({status:err}));
};

// Agregar una receta nueva
recetaCtrl.addReceta = async (req, res) => {
    const erroresValidacion = validarBodyReceta(req.body);
    if (Object.keys(erroresValidacion).length > 0) {
        return res.status(400).json({
            status: 'Validation error',
            errors: erroresValidacion
        });
    }

    const receta = new Receta(req.body);
    await receta.save()
        .then((data)=> res.status(201).json({status:'Receta Successully Inserted'}))
        .catch((err)=>res.status(400).json({status:err}));
};

// Actualizar una receta
recetaCtrl.updateReceta = async (req, res) => {
    const erroresValidacion = validarBodyReceta(req.body);
    if (Object.keys(erroresValidacion).length > 0) {
        return res.status(400).json({
            status: 'Validation error',
            errors: erroresValidacion
        });
    }

    const receta = req.body;
    await Receta.findByIdAndUpdate(
        req.params.id,
        {$set: receta},
        {new: true, runValidators: true})
        .then((data)=> {
            if(data)res.status(200).json({status:'Receta Successully Updated'});
            else res.status(404).json({status:'Receta not found'})
        })
        .catch((err)=>res.status(400).json({status:err}));
};

// Eliminar una receta
recetaCtrl.deleteReceta = async (req, res) => {
    await Receta.findByIdAndDelete(req.params.id)
        .then((data)=> {
            if(data)res.status(200).json({status:'Receta Successully Deleted'});
            else res.status(404).json({status:'Receta not found'})
        })
        .catch((err)=>res.status(400).json({status:err}));
};

// Saca la Lista de Categorias
recetaCtrl.getCategorias = async (req, res) => {
    await Receta.find().distinct('categorias')
        .then((data)=> {
            res.status(200).json({status:data})
        })
        .catch((err)=>res.status(400).json({status:err}));
};

module.exports = recetaCtrl;