//@ts-check
import express from 'express';
import handlebars from 'express-handlebars';
import { MsgModel } from './DAO/models/msgs.model.js';
/* import { routerPets } from "./routes/pets.router.js";
import { routerProductos } from "./routes/productos.router.js";
import { routerVistaProductos } from "./routes/productos.vista.router.js";
 */
import { routerVistaChatSocket } from './routes/chat-socket.vista.router.js';

import { __dirname } from './dirname.js';
import { Server } from 'socket.io';
import { routerUsers } from './routes/users.router.js';
import { connectMongo } from './utils/connections.js';

const app = express();
const port = 3000;

//mongodb+srv://guillermofergnani:d3IUa8A4QOAZkoQa@guille-cluster.pzfq0ua.mongodb.net/?retryWrites=true&w=majority
connectMongo();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//CONFIGURACION DEL MOTOR DE HANDLEBARS
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//archivos publicos
app.use(express.static(__dirname + '/public'));
//ENDPOINT TIPO API CON DATOS CRUDOS EN JSON
/* app.use("/api/productos", routerProductos);
app.use("/api/pets", routerPets);
 */

/* //HTML REAL TIPO VISTA
app.use("/vista/productos", routerVistaProductos);


 */

app.use('/vista/chat-socket', routerVistaChatSocket);
app.use('/api/users', routerUsers);

app.get('*', (req, res) => {
  return res.status(404).json({
    status: 'error',
    msg: 'error esa ruta no existe',
    data: {},
  });
});

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const socketServer = new Server(httpServer);
socketServer.on('connection', (socket) => {
  socket.on('msg_front_to_back', async (msg) => {
    const msgCreated = await MsgModel.create(msg);
    const msgs = await MsgModel.find({});
    socketServer.emit('todos_los_msgs', msgs);
  });
});
