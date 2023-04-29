const { createTokens } = require('../middleware/auth');
const {User} = require('../Models/models')
const bcrypt = require('bcrypt')


exports.getAllUsers = async (req, res) => {
    const users = await User.findAll();
    res.json(users);
}

exports.getOneUserById = async(req, res) => {
    const user = await User.findOne({where: {user_id: req.params.id}})
    res.json(user)
}   
 
// A modifier ! :
// Vérifie si il existe déjà le user
exports.createUser = (req, res) =>{
    const {nom, prenom,age,tel, mail, mdp, sexe,addr,code_post,logement} = req.body

    bcrypt.hash(mdp, 10).then((hash)=>{
        User.create({nom:nom, prenom: prenom,age:age,tel: tel, mail: mail, mdp: hash, sexe:sexe,addr: addr,code_post:code_post,logement: logement})
        .then(()=> {res.status(200).json({message: " User créé !"})
        })
        .catch((err)=>{
            if (err){
                res.status(400).json({error: err});
            }
        })
    })
    
}

exports.login = async(req, res)=>{
    const user = await User.findOne({ where: {mail: req.body.mail}})
    .then((user)=>{
        if (!user) {
            return res.status(401).json({ error: "Utilisateur non trouvé !" })
        }
        bcrypt.compare(req.body.mdp, user.mdp)
        .then((match)=>{
        if (!match){
            res.status(400).json({error: "Wrong User/mdp combination"})
        } else{
            const accessToken = createTokens(user)

            res.cookie("access-token", accessToken,{
                maxAge: 60*60*24 ,// 24h
                httpOnly: true
            })
            res.json("logged in ")
        }
        })
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

    
