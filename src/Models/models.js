const User = require("./User")
const Animal = require("./Animal")
const Petsitter = require("./Petsitter")

 

User.hasMany(Animal,{foreignKey: {name:'user_id', allowNull: false}, onDelete: 'CASCADE'})
Animal.belongsTo(User,{foreignKey: 'user_id'})

User.hasOne(Petsitter, {foreignKey: {name:'user_id', allowNull: false}, onDelete: 'CASCADE'})
Petsitter.belongsTo(User, {foreignKey: 'user_id'})


User.sync({alter : true})
Animal.sync({alter: true})
Petsitter.sync({alter: true})





module.exports = {User, Animal, Petsitter}