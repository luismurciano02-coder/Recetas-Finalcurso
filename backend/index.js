// console.log("Hola desde el backend");
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const { connectDB } = require('./database');

const getMongoDebugInfo = () => {
    const uri = process.env.MONGODB_URI || '';

    if (!uri) {
        return {
            hasMongoUri: false,
            mongoHost: null,
            mongoDb: null,
        };
    }

    try {
        const cleanedUri = uri.replace('mongodb+srv://', 'https://').replace('mongodb://', 'https://');
        const parsed = new URL(cleanedUri);

        return {
            hasMongoUri: true,
            mongoHost: parsed.hostname || null,
            mongoDb: (parsed.pathname || '').replace('/', '') || null,
        };
    } catch (error) {
        return {
            hasMongoUri: true,
            mongoHost: 'invalid-uri-format',
            mongoDb: null,
        };
    }
};

//Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/v1/recetas', require('./routes/receta.route'));
app.get('/api/v1/debug/config', (req, res) => {
    res.status(200).json({
        status: 'ok',
        vercel: Boolean(process.env.VERCEL),
        nodeEnv: process.env.NODE_ENV || null,
        ...getMongoDebugInfo(),
    });
});
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