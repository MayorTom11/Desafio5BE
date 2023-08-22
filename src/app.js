import express from "express"
import { config } from "./config/config.js";
import { connectDB } from "./config/dbConnection.js";
import {engine} from "express-handlebars";
import {__dirname} from "./utils.js";
import path from "path";
import session from "express-session"
import MongoStore from "connect-mongo"
import { viewsRouter } from "./routes/views.routes.js";
import { productsRouter } from "./routes/products.routes.js";
import { cartsRouter } from "./routes/carts.routes.js";
import { sessionsRouter } from "./routes/sessions.routes.js";

const port = config.server.port
const app = express()

// Midlewares
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"/public")))

// Servers
const httpServer = app.listen(port, ()=>console.log(`Server listening on port ${port}`))

// Conexion a la base de datos
connectDB()

// Configuracion handlebars con engine
app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,"/views"));

// Configuracion de sesiones
app.use(session({
    store:MongoStore.create({
        mongoUrl:config.mongo.url
    }),
    secret:config.server.secretSession,
    resave:true,
    saveUninitialized:true
}))

// Routes
app.use("/api/products",productsRouter)
app.use("/api/carts",cartsRouter)
app.use(viewsRouter)
app.use("/api/sessions",sessionsRouter)