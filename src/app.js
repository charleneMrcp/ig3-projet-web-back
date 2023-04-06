const express = require("express")
const helmet = require("helmet")


const userRoutes = require("./Routes/UserRoutes") // chargement routes user
const animalRoutes = require("./Routes/AnimalRoutes")// chargement routes animal


const app = express()


app.use(helmet())

app.use(express.json())// Transforme les requêtes entrantes JSON en objet JS 


// Exporte le module app pour l'utiliser dans d'autres fichiers (server.js)
app.use(express.urlencoded({extended: true})) // Permet de lire les données des strings dans les requêtes entrantes 

app.get("/", (req,res)=>{
    res.json("Hello")
})


// User route => Vérifications faites !
app.get("/:id", userRoutes)
app.get("/users", userRoutes)
app.post('/inscription', userRoutes)
app.put('/modification/:id', userRoutes)
app.delete('/suppression/:id', userRoutes)
 


// Animal route

app.get('/animals/tous', animalRoutes)
app.get('/animals/chats', animalRoutes)
app.post('/newAnimal', animalRoutes)
app.put('/modifAnimal', animalRoutes)
app.delete('/deleteAnimal', animalRoutes)
app.delete('/deleteAnimals', animalRoutes)


module.exports = app 
