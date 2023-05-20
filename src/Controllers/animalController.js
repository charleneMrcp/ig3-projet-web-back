const {Animal} = require('../Models/models');
const {User} = require('../Models/models');

const userController = require("./userController")

exports.getAnimal = async (req, res) => {
    try {
      const animal = await Animal.findOne({ where: { pet_id: req.params.id } });
      if (!animal) {
        return res.status(404).json({ message: 'Animal not found' });
      }
      res.status(200).json(animal);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }




exports.getAllAnimalsOfaUser = async (req, res) => {
    try {
      const animals = await Animal.findAll({ where: { user_id: req.auth.userId } });
      if (animals.length == 0) {
        return res.status(201).json({});
      }
      return res.status(200).json(animals);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  


exports.createAnimal = async(req, res)=>{     
    const { nom_pet, type, sexe, age, taille, poids, race, vs_dog, vs_cat, vs_humain, vs_enfants, desc_gene  } = req.body    
    
    const animal = Animal.create({user_id: req.auth.userId,  nom_pet: nom_pet, type: type, sexe: sexe, age: age, taille: taille, poids: poids, race: race, vs_dog: vs_dog, vs_cat: vs_cat, vs_humain: vs_humain, vs_enfants: vs_enfants, desc_gene: desc_gene })
        .then(()=>{
            res.status(201).json( {message : " Animal ajouté ! "})
        })
        .catch(err =>{
           res.status(500).json({ message : "Serveur error"})
        })
    
}


exports.updateAnimal = async(req,res) =>{
    const animal = await Animal.findOne({where: {pet_id: req.params.id}})
    if (animal){
        const { nom_pet, type, sexe, age, taille, poids, race, vs_dog, vs_cat, vs_humain, vs_enfants, desc_gene} =req.body
        try {
            const changement = await animal.update({ nom_pet: nom_pet, type: type, sexe: sexe, age: age, taille: taille, poids: poids, race: race, vs_dog: vs_dog, vs_cat: vs_cat, vs_humain: vs_humain, vs_enfants: vs_enfants, desc_gene: desc_gene })
            return res.status(200).json({message: " Animal modifié !"})
        } catch (err) {
            console.error(err);
            return res.status(500).json({message: "Erreur serveur lors de la mise à jour de l'animal"})
        }
    }
    else{
        return res.status(404).json({message: " Animal not found !"})
    } 
}

 
exports.deleteAnimal = async (req, res) => {
    try {
      const animal = await Animal.findOne({ where: { pet_id: req.params.id }});
      if (!animal) {
        return res.status(404).json({ message: "Animal not found" });
      }
      await animal.destroy();
      res.status(200).json({ message: "Animal deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
  

