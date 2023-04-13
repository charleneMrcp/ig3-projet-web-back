const {User} = require('../Models/models')
const {Petsitter} = require('../Models/models')
const { Reservation } = require("../Models/models")



// To do : Ajouter la verif que le sitter existe
exports.createReservation = async(req,res)=>{
    const {sitter_id, pet_id, libelle_acti, date_debut, date_fin, quick_desc} = req.body    
    const reserv = Reservation.create({sitter_id: sitter_id,pet_id: pet_id, libelle_acti: libelle_acti, date_debut: date_debut, date_fin: date_fin, quick_desc: quick_desc})
    .then(()=>{
        res.status(200).json( {message : " Reservation en attente de validation du Petsitter ! "})
    })
    .catch(err =>{
        console.info(err)
       res.status(500).json({ message : "Serveur error | petsitter not found"})
    })
}

// On peut faire toutes les reservation validés, non validés , en attente 

exports.getReservations = async(req, res) => {
    const reserv = await Reservation.findAll({where: {sitter_id: req.params.id}})
    .then((reserv)=>{
        res.status(200).json( reserv)
    })
    .catch(err =>{
        console.info(err)
       res.status(404).json({ message : "Reservation not found"})
    })
} 

exports.getAllReservations = async(req, res) => {
    const reserv = await Reservation.findAll()
    .then((reserv)=>{
        res.status(200).json( reserv)
    })
    .catch(err =>{
        console.info(err)
       res.status(500).json({ message : "Serveur error"})
    })
}


// Rajouter erreur serveur 
exports.updateReservationValidation = async(req,res) =>{
    const reserv = await Reservation.findOne({where: {res_id: req.params.id}})
    if (reserv){
        const changement = await reserv.update({ validation : req.body.validation })
        res.status(200).json({message: " Reservation a eu sa validation !"})
    }
    else{
        res.status(404).json({message: " Reservation not found !"})
    }
    
}

exports.deleteReservation = async(req,res) =>{
    const reserv = await Reservation.findOne({where: {res_id: req.params.id}})
    const changement = await reserv.destroy()
    res.status(200).json({message: "Reservation deleted"})
}


exports.deleteReservations = async(req,res)=>{
    const reserv = await Reservation.findAll()
    const changement =  reserv.forEach(element => {
         element.destroy()
    })
    res.status(200).json({message: "Reservations deleted"})

}
