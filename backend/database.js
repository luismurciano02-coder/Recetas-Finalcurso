const mongoose = require('mongoose');
const URI = process.env.MONGODB_URI || 'mongodb+srv://recetas:wdsa1234@recetas-proyectofinal.vd8t6pp.mongodb.net/recetas?appName=RECETAS-PROYECTOFINAL';

const globalWithMongoose = global;

if (!globalWithMongoose._mongooseCache) {
    globalWithMongoose._mongooseCache = { conn: null, promise: null };
}

const cache = globalWithMongoose._mongooseCache;

const connectDB = async () => {
    if (cache.conn) {
        return cache.conn;
    }

    if (!cache.promise) {
        cache.promise = mongoose.connect(URI, {
            family: 4,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
        }).then((connection) => {
            console.log('DB is connected');
            return connection;
        }).catch((error) => {
            cache.promise = null;
            cache.conn = null;
            throw error;
        });
    }

    cache.conn = await cache.promise;
    return cache.conn;
};

module.exports = { mongoose, connectDB };