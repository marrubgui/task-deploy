import express from 'express'
import TaskRoutes from './routes/taskRoutes'
import morgan from 'morgan' //permite obteenr lo que se esta realizando por linea de comandos
import cors from 'cors' //permite que otros origenes se conecten al servidor

const app = express();

app.set('port', process.env.PORT || 3000); //setea valor a variable port alamcenado en app


//middlewares
const corsOptions = {}; // servidores permitidos para hacer peticiones por ejemplo permitir que el servidor de Angualr haga peticiones
app.use(cors()); //se puede configurar
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false})) // permite que las peticiones se realicen enviando forms html


app.get('/', (req, res) => {
    res.json({ message: 'Hola' })
})

app.use('/api/tasks', TaskRoutes);

export default app;