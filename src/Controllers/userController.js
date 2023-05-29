const { createTokens , validateToken} = require('../middleware/auth');
const {User} = require('../Models/models')
const bcrypt = require('bcrypt')

// Pour récupérer les infos coté user d'un petsitter sans envoyer les données sensibles
exports.getOneUserById = async (req, res) => {
    try {
      const user = await User.findOne({ where: { user_id: req.params.id } });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const infos = {
        nom: user.nom,
        prenom: user.prenom,
        age: user.age,
        sexe: user.sexe,
        tel: user.tel,
        mail: user.mail,
        code_post: user.code_post,
        logement: user.logement
      };
  
      res.status(200).json(infos);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };
  

  exports.getOneUserById2 = async(req, res) => {
    try {
        const user = await User.findOne({where: {user_id: req.auth.userId}});
        if (user) {
            const infos = {
                nom: user.nom,
                prenom: user.prenom,
                age: user.age,
                addr: user.addr,
                mail: user.mail,
                code_post: user.code_post,
                logement: user.logement,
                sexe: user.sexe,
                tel: user.tel,
                is_sitter: user.is_sitter
            };
            res.status(200).json(infos);
        } else {
            res.status(404).json({message: "Utilisateur introuvable"});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Erreur serveur lors de la récupération des informations de l'utilisateur"});
    }
}



// A modifier ! :
// Vérifie si il existe déjà le user
exports.createUser = async(req, res) =>{
    const {nom, prenom,age,tel, mail, mdp, sexe,addr,code_post,logement} = req.body
    const userAlreadyExist = await User.findOne({where: {mail: mail}});

    if (userAlreadyExist){
        res.status(409).json({message: "Mail already used for a user !"})
    }
    else{
        bcrypt.hash(mdp, 10).then((hash)=>{
        User.create({nom:nom, prenom: prenom,age:age,tel: tel, mail: mail, mdp: hash, sexe:sexe,addr: addr,code_post:code_post,logement: logement})
        .then(()=> {
            res.status(200).json({message: " User créé !"})
        })
        .catch((err)=>{
            res.status(500).json({error: err});
            
        })
    })
    }
    
    
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
                res.status(401).json({error: "Wrong User/mdp combination"})
            } else{
                const accessToken = createTokens(user)
                res.status(201).json({
                    userId: user.user_id,
                    token: accessToken})
                
            }
        })
    })
    .catch(err =>{
        res.status(500).json({error: err})
    })

}



exports.updateUser = async (req, res) => {
    try {
      const user = await User.findOne({ where: { user_id: req.auth.userId } });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const updatedUser = await user.update(req.body);
      res.status(200).json({ message: "User updated successfully"});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
    }
  };
  

  exports.deleteUser = async(req,res) =>{
    try {
        const user = await User.findOne({where: {user_id: req.auth.userId}});
        if (!user) {
            res.status(404).json({message: "User not found"});
        }
        const changement = await user.destroy();
        res.status(200).json({message: "User deleted"});
    } catch (err) {
        console.log(err);
        res.status(500).json({message: "Server error"});
    }
}

    
