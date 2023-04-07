const {User} = require('../Models/models')

exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
}

exports.getOneUserById = async(req, res) => {
    const user = await User.findOne({where: {user_id: req.params.id}})
    res.json(user)
}   
 
// A modifier ! 
exports.createUser = (req, res) =>{
    const {nom, prenom,age,tel, mail, mdp, sexe,addr,code_post,logement} = req.body
    User.create({nom:nom, prenom: prenom,age:age,tel: tel, mail: mail, mdp: mdp, sexe:sexe,addr: addr,code_post:code_post,logement: logement})
    res.status(200).json({
       message: " User créé !"
    })
}

exports.updateUser = async(req,res) =>{
    const user = await User.findOne({where: {user_id: req.params.id}})
    const changement = await user.update(req.body)
    res.status(200).json(user)
}

exports.deleteUser = async(req,res) =>{
    const user = await User.findOne({where: {user_id: req.params.id}})
    const changement = await user.destroy()
    res.status(200).json({message: "user deleted"})
}

    
