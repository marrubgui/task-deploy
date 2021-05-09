import { config } from 'dotenv'

config(); //carga las variables de entorno

export default {
    mongodbURL: process.env.MONGODB_URI || 'mongodb://localhost/taskdb' //utiliza una conexion local
}