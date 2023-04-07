const {Animal} = require('../Models/models');
const {User} = require('../Models/models');

const userController = require("./userController")

exports.getAllAnimals = async (req, res) => {
    const animal = await Animal.findAll()
    res.json(animal);
}


exports.getAllAnimalsOfaUser = async (req, res) => {
    const animal = await Animal.findAll({where: {user_id: req.params.id}})
    res.json(animal);
}

exports.getCats = async (req, res) => {
    const cats = await Animal.findAll({where: {type: 'Chat'}});
    res.json(cats);
}

exports.createAnimal = async(req, res)=>{
    
    const data = {
        user_id: req.params.id,
        nom_pet: "Royou" ,
        type: "Chien",
        sexe: "Femêle" ,
        age: 3,
        taille: 20,
        poids: 4,
        race: "Inconnue" ,
        vs_dog: "True" ,
        vs_cat: "True",
        vs_humain: "True",
        vs_enfants: "True",
        desc_gene:"Ce chat est génial !  Petit problème de vue"}
    const animal = Animal.create(data)
        .then(()=>{
            res.status(200).json( {message : " Animal ajouté ! "})
        })
        .catch(err =>{
            console.log("error: "+ err)
        })
    
}

// Rajouter exception si l'animal n'existe pas !
exports.updateAnimal = async(req,res) =>{
    const animal = await Animal.findOne({where: {pet_id: req.params.id}})
    const changement = await animal.update({ nom_pet : "Bricoleux" })
    res.status(200).json({message: " Animal modifié !"})
}
 
exports.deleteAnimal = async(req,res) =>{
    const animal = await Animal.findOne({where: {pet_id: req.params.id}})
    const changement = await animal.destroy()
    res.status(200).json({message: "Animal deleted"})
}

exports.deleteAnimals = async(req,res)=>{
    const animals = await Animal.findAll()
    const changement =  animals.forEach(element => {
         element.destroy()
    })
    res.status(200).json({message: "Animals deleted"})

}