import express from "express"
import handlebars from "express-handlebars"
import {__dirname} from "./utils.js"
import productRoutes from "./src/routes/products.routes.js"
import cartRoutes from "./src/routes/carts.routes.js"
import viewRoutes from "./src/routes/views.routes.js"
import userRoutes from "./src/routes/users.routes.js"
import sessionRoutes from "./src/routes/sessions.routes.js"
import mongoose from "mongoose"
import Handlebars from "handlebars"
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'
import path from "path"
import initializePassport from "./src/config/passport.config.js"
import passport from "passport"


const app = express()

//Mongo Atlas
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://Meli:Melisa537@noeserver.c5gx1p7.mongodb.net/Shanti?retryWrites=true&w=majority', (error) => {
  if(error) {
    console.log('Error al conectar a Mongo Atlas', error);
  } else {
    console.log('Conectado a Mongo Atlas');
  }
})

//Handlebars
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

//middlewares
app.set('views', __dirname + '/src/views')
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '/src/public')));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
initializePassport()
app.use(passport.initialize())

//Routes
app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/users', userRoutes)
app.use('/api/sessions', sessionRoutes)
app.use('/', viewRoutes)


//Port
app.listen(8080, ()=>console.log("listening on port 8080"))

