const {User} = require('../Models/models');
const {Petsitter} = require('../Models/models')

exports.createPetsitter = async(req,res)=>{
    const {user_id, vehicule, surface, note, exp_desc, loge_desc, motiv_desc, exterieur} = req.body
    const sitter = Petsitter.create({user_id: user_id, vehicule: vehicule, surface: surface, note: note, exp_desc: exp_desc, loge_desc: loge_desc, motiv_desc: motiv_desc, exterieur: exterieur})
    .then(()=>{
        res.status(200).json( {message : " Petsitter fonction ajoutée ! "})
    })
    .catch(err =>{
        console.log(err)
       res.status(500).json({ message : "Serveur error"})
    })
}



exports.getPetsitter = async(req, res) => {
    const petsitter = await Petsitter.findOne({where: {sitter_id: req.params.id}})
    .then((petsitter)=>{
        res.status(200).json( petsitter)
    })
    .catch(err =>{
        console.info(err)
       res.status(500).json({ message : "Serveur error"})
    })
} 

exports.getAllPetsitters = async(req, res) => {
    const petsitters = await Petsitter.findAll()
    .then((petsitters)=>{
        res.status(200).json( petsitters)
    })
    .catch(err =>{
        console.info(err)
       res.status(500).json({ message : "Serveur error"})
    })
}

// Rajouter erreur serveur 
exports.updatePetsitterNote = async(req,res) =>{
    const sitter = await Petsitter.findOne({where: {sitter_id: req.params.id}})
    if (sitter){
        const changement = await sitter.update({ note : req.body.note })
        res.status(200).json({message: " Petsitter notifié (noté) !"})
    }
    else{
        res.status(404).json({message: " Petsitter not found !"})
    }
    
}
exports.deletePetsitter = async(req,res) =>{
    const sitter = await Petsitter.findOne({where: {sitter_id: req.params.id}})
    const changement = await sitter.destroy()
    res.status(200).json({message: "Petsitter deleted"})
}


exports.deletePetsitters = async(req,res)=>{
    const sitter = await Petsitter.findAll()
    const changement =  sitter.forEach(element => {
         element.destroy()
    })
    res.status(200).json({message: "Petsitters deleted"})

}
