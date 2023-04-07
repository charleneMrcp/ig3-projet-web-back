const {User} = require('../Models/models');

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
}

exports.getOneUserById = async(req, res) => {
    const user = await User.findOne({where: {user_id: req.params.id}})
    res.json(user)
}   
 

exports.createUser = (req, res) =>{
    const user = User.create({
        nom: "Charlène",
        prenom: "Anonyme",
        age: 18,
        tel:  "06 76 56 55 44",
        mail:  "family3@TextDecoderStream.com",
        mdp:  "password",
        sexe:  "Femme",
        addr:  "4 rue machin",
        code_post: 34000,
        logement:  "appartement"
    })
    res.status(200).json({
       message: " User créé !"
    })
}

exports.updateUser = async(req,res) =>{
    const user = await User.findOne({where: {user_id: req.params.id}})
    const changement = await user.update({ age : 23 })
    res.status(200).json(user)
}

exports.deleteUser = async(req,res) =>{
    const user = await User.findOne({where: {user_id: req.params.id}})
    const changement = await user.destroy()
    res.status(200).json({message: "user deleted"})
}

    
