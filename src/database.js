import mongoose from 'mongoose'
import config from  './config'

(async () => {
    try{
    const db = await mongoose.connect(config.mongodbURL,{    // Si no existe la db la crea.
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('Database is connected to',db.connection.name);
    }

    catch(error){
        console.log(`Error: ${error}`);
    }

})(); // se ejecuta automaticamente al iniciar.



