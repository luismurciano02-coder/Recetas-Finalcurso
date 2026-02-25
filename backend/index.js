// console.log("Hola desde el backend");
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const { connectDB } = require('./database');

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/v1/recetas', require('./routes/receta.route'));
app.use('/', (req, res) => res.send('API is in /api/v1/recetas/'));

//Settings
app.set('port', process.env.PORT || 3000);

connectDB().catch((err) => {
    console.error('DB connection error:', err.message);
});

if (!process.env.VERCEL) {
    app.listen(app.get('port'),() =>{
        console.log('Server on port', app.get('port'));
    });
}

module.exports = app;