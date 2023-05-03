const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const bcrypt = require('bcrypt');

const { createTokens, validateToken} =  require('./middleware/auth')

const userRoutes = require("./Routes/UserRoutes") // chargement routes user
const animalRoutes = require("./Routes/AnimalRoutes")// chargement routes animal
const petsitterRoutes = require("./Routes/PetsitterRoutes") // chargement routes petsitter
const reservationRoutes = require("./Routes/ReservationRoutes")// chargement routes reservation

const app = express();


app.use(helmet());
app.use(cors());

app.use(express.json())// Transforme les requêtes entrantes JSON en objet JS 


// Exporte le module app pour l'utiliser dans d'autres fichiers (server.js)
app.use(express.urlencoded({extended: true})) // Permet de lire les données des strings dans les requêtes entrantes 

app.get("/", (req,res)=>{
    res.json("Hello")
})


// User route => Vérifications faites !

app.use("/user", userRoutes)


// Animal route
app.use('/animals', animalRoutes)

// Petsitter route
app.use('/petsitters', petsitterRoutes)

// Reservation route
app.use("/reservations", reservationRoutes)

module.exports = app 
