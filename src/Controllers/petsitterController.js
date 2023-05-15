const {User} = require('../Models/models');
const {Petsitter} = require('../Models/models');
const { createTokens , validateToken} = require('../middleware/auth');



exports.createPetsitter = async(req,res)=>{
    const {vehicule, surface, exp_desc, loge_desc, motiv_desc, exterieur} = req.body
    const sitter = await Petsitter.create({user_id: req.auth.userId, vehicule: vehicule, surface: surface, exp_desc: exp_desc, loge_desc: loge_desc, motiv_desc: motiv_desc, exterieur: exterieur})
    .then(async(response)=>{
        const user = await User.findOne({where:{user_id : response.user_id}})
        if (!user){
            res.status(404).json({message : "Pas d'utilisateur trouvé"})
        }
        await user.update({is_sitter: true})
        res.status(204).json( {message : " Petsitter fonction ajoutée ! "})
    })
    .catch(err =>{
        console.log(err)
       res.status(500).json({ message : "Serveur error"})
    })
}



exports.getPetsitter = async(req, res) => {
    const petsitter = await Petsitter.findOne({where: {sitter_id: req.params.id}})
    .then((petsitter)=>{
        res.status(200).json(petsitter)
    })
    .catch(err =>{
       res.status(404).json({ message : "Aucun petsitter trouvé"})
    })
} 



// On récupère les user_id des petsitters
exports.getAllPetsitters = async(req, res) => {
    try {
      const petsitters = await Petsitter.findAll()
      const recupId = [];
      for (const element of petsitters) {
        const user = await User.findOne({where: { user_id: element.user_id}});
        if (!user){
            res.status(404).json({message : "Pas d'utilisateur trouvé"})
        }
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
        res.status(500).json({ message : "Serveur error"})
    }
}

  


exports.deletePetsitter = async (req, res) => {
    try {
      const sitter = await Petsitter.destroy({ where: { user_id: req.auth.userId } });
      const user = await User.findOne({ where: { user_id: req.auth.userId } });
      if (!user) {
        return res.status(404).json({ message: "Utilisateur pour la modification du status petsitter non trouvé" });
      }
      await user.update({ is_sitter: false });
      res.status(200).json({ message: "Petsitter supprimé" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
  

