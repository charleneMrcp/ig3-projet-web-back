const {Animal} = require('../Models/models');

exports.getAllAnimals = async (req, res) => {
    const animal = await Animal.findAll()
    res.json(animal);
}

exports.getCats = async (req, res) => {
    const cats = await Animal.findAll({where: {type: 'Chat'}});
    res.json(cats);
}

exports.createAnimal = async(req, res)=>{
    const animal = Animal.create({
        nom_pet: "Roy" ,
        type: "Chien",
        sexe: "Mâle" ,
        age: 3,
        taille: 20,
        poids: 4,
        race: "Inconnue" ,
        vs_dog: "True" ,
        vs_cat: "True",
        vs_humain: "True",
        vs_enfants: "True",
        desc_gene:"Ce chat est génial !  Petit problème de vue"})
    res.status(200).json( {message : " Animal ajouté ! "})
}

// Rajouter exception si l'animal n'existe pas !
exports.updateAnimal = async(req,res) =>{
    const animal = await Animal.findOne({where: {pet_id: 3}})
    const changement = await animal.update({ nom_pet : "Bricoleux" })
    res.status(200).json({message: " Animal modifié !"})
}
 
exports.deleteAnimal = async(req,res) =>{
    const animal = await Animal.findOne({where: {pet_id: 1}})
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