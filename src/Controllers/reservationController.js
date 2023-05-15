const {User} = require('../Models/models')
const {Petsitter} = require('../Models/models')
const { Reservation } = require("../Models/models")
const { Animal } = require("../Models/models")


exports.createReservation = async(req,res)=>{   
    const {sitter_id, pet_id, libelle_acti, date_debut,h_debut,h_fin, date_fin, quick_desc} = req.body
    const petsitter = await Petsitter.findOne({where:{sitter_id: sitter_id}})
    if(!petsitter){
        res.status(404).json({message: "Le Petsitter n'existe pas"})
    }
    const reserv = Reservation.create({user_id:req.auth.userId,sitter_id: sitter_id,pet_id: pet_id, libelle_acti: libelle_acti, date_debut: date_debut, date_fin: date_fin,h_debut:h_debut,h_fin:h_fin, quick_desc: quick_desc})
    .then(()=>{
        res.status(200).json( {message : " Reservation en attente de validation du Petsitter ! "})
    })
    .catch(err =>{
        console.info(err)
       res.status(500).json({ message : err})
    })
}


exports.getReservations = async(req, res) => {
    const reserv = await Reservation.findOne({where: {res_id: req.params.id}})
    const sitter = await Petsitter.findOne({where: {sitter_id: reserv.sitter_id}})
    const user = await User.findOne({where: {user_id:sitter.user_id}});
    const animal = await Animal.findOne({where:{pet_id: reserv.pet_id }})
    
    const need = {
        sitter_id: reserv.sitter_id,
        pet_id: reserv.pet_id,
        nom_pet: animal.nom_pet,
        nom: user.nom,
        prenom: user.prenom,
        res_id:reserv.res_id,
        validation: reserv.validation,
        date_debut:reserv.date_debut,
        date_fin: reserv.date_fin,
        h_debut:reserv.h_debut,
        h_fin:reserv.h_fin,
        quick_desc:  reserv.quick_desc,
        prix_final:reserv.prix_final,
    }
    
    
    res.status(200).json(need)
    
    
} 
// Recupère les reservayions de l'utilisateur
exports.getAllReservations = async(req, res) => {
    const reserv = await Reservation.findAll({where:{user_id: req.auth.userId}})
    const renvoi = [];
    for (const element of reserv){
        const sitter = await Petsitter.findOne({where: {sitter_id: element.sitter_id}})
        const user = await User.findOne({where: {user_id:sitter.user_id}});
        const animal = await Animal.findOne({where:{pet_id: element.pet_id }})
        const need = {
            sitter_id: element.sitter_id,
            pet_id: element.pet_id,
            nom_pet: animal.nom_pet,
            nom: user.nom,
            prenom: user.prenom,
            res_id: element.res_id,
            validation: element.validation,
            date_debut:element.date_debut,
            date_fin: element.date_fin,
            h_debut:element.h_debut,
            h_fin:element.h_fin,
            quick_desc:  element.quick_desc,
            prix_final:element.prix_final,
        }
        renvoi.push(need);
    
    }
    res.status(200).json( renvoi)
    
}
// Recupère toutes les réservations du petsitter
exports.getAllReservations2 = async(req, res) => {
    try {
      const sitter = await Petsitter.findOne({where:{user_id: req.auth.userId}})
      if (!sitter) {
        return res.status(404).json({ message : "Petsitter introuvable"})
      }
      const reserv = await Reservation.findAll({where:{sitter_id: sitter.sitter_id}})
      const renvoi = [];
      for (const element of reserv){
        const user = await User.findOne({where: {user_id:req.auth.userId}});
        const animal = await Animal.findOne({where:{pet_id: element.pet_id }})
        const need = {
            sitter_id: element.sitter_id,
            pet_id: element.pet_id,
            nom_pet: animal.nom_pet,
            nom: user.nom,
            prenom: user.prenom,
            res_id: element.res_id,
            validation: element.validation,
            date_debut:element.date_debut,
            date_fin: element.date_fin,
            h_debut:element.h_debut,
            h_fin:element.h_fin,
            quick_desc:  element.quick_desc,
            prix_final:element.prix_final,
        }
        renvoi.push(need);
    
    }
    res.status(200).json( renvoi)
  }
  catch (err){
    res.status(500).json({ message : "Serveur error"})
  }
}  



exports.updateReservationValidation = async(req,res) =>{
    try {
        const reserv = await Reservation.findOne({where: {res_id: req.params.id}})
        if (reserv){
            const changement = await reserv.update({ validation : true })
            res.status(200).json({message: " Reservation a eu sa validation !"})
        }
        else{
            res.status(404).json({message: " Reservation not found !"})
        }
    } catch (err) {
        console.info(err)
        res.status(500).json({ message : "Serveur error"})
    }
}


exports.deleteReservation = async(req,res) =>{
    const reserv = await Reservation.findOne({where: {res_id: req.params.id}})
    if (!reserv) {
        res.status(404).json({ message : "Réservation non trouvée"})
    } else {
        await reserv.destroy()
        res.status(200).json({message: "Réservation supprimée"})
    }
}

