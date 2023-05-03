const {Animal} = require('../Models/models');
const {User} = require('../Models/models');

const userController = require("./userController")

exports.getAnimal = async (req,res) =>{
    const animal = await Animal.findOne({where:{pet_id: req.params.id}})
    .then((animal)=> {
        res.json(animal)
    })
    .catch(err =>{
        res.status(500).json({ message : "Serveur error"})
     })
}


exports.getAllAnimals = async (req, res) => {
    const animal = await Animal.findAll()
    res.json(animal);
}


exports.getAllAnimalsOfaUser = async (req, res) => {
    const animal = await Animal.findAll({where: {user_id: req.auth.userId}})
    .then(animal =>{res.json(animal);})
}

exports.getCats = async (req, res) => {
    const cats = await Animal.findAll({where: {type: 'Chat'}});
    res.json(cats);
}

exports.createAnimal = async(req, res)=>{     
    const { nom_pet, type, sexe, age, taille, poids, race, vs_dog, vs_cat, vs_humain, vs_enfants, desc_gene  } = req.body    
    
    const animal = Animal.create({user_id: req.auth.userId,  nom_pet: nom_pet, type: type, sexe: sexe, age: age, taille: taille, poids: poids, race: race, vs_dog: vs_dog, vs_cat: vs_cat, vs_humain: vs_humain, vs_enfants: vs_enfants, desc_gene: desc_gene })
        .then(()=>{
            res.status(200).json( {message : " Animal ajouté ! "})
        })
        .catch(err =>{
           res.status(500).json({ message : "Serveur error"})
        })
    
}

// Rajouter erreur serveur 
exports.updateAnimalName = async(req,res) =>{
    const animal = await Animal.findOne({where: {pet_id: req.params.id}})
    if (animal){
        const { nom_pet, type, sexe, age, taille, poids, race, vs_dog, vs_cat, vs_humain, vs_enfants, desc_gene} =req.body
        const changement = await animal.update({ nom_pet: nom_pet, type: type, sexe: sexe, age: age, taille: taille, poids: poids, race: race, vs_dog: vs_dog, vs_cat: vs_cat, vs_humain: vs_humain, vs_enfants: vs_enfants, desc_gene: desc_gene })
        res.status(200).json({message: " Animal modifié !"})
    }
    else{
        res.status(404).json({message: " Animal not found !"})
    }
    
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