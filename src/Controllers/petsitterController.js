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

// On récupère les user_id des petsitters
exports.getAllPetsitters = async(req, res) => {
    try {
      const petsitters = await Petsitter.findAll()
      const recupId = [];
      for (const element of petsitters) {
        const user = await User.findOne({where: { user_id: element.user_id}});
        const need = {
            sitter_id: element.sitter_id,
            nom: user.nom,
            prenom: user.prenom,
            age: user.age,
            sexe: user.sexe
        }
        recupId.push(need)
      }
      res.status(200).json(recupId)
    } catch (err) {
      console.info(err)
      res.status(500).json({ message : "Serveur error"})
    }
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
