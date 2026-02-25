const mongoose = require('mongoose');
const URI = 'mongodb+srv://recetas:wdsa1234@recetas-proyectofinal.vd8t6pp.mongodb.net/recetas?appName=RECETAS-PROYECTOFINAL';
mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;