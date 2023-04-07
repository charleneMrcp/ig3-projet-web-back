const User = require("./User")
const Animal = require("./Animal")

 

User.hasMany(Animal,{foreignKey: {name:'user_id', allowNull: false}, onDelete: 'CASCADE'})
Animal.belongsTo(User,{foreignKey: 'user_id'})

User.sync({alter : true})
Animal.sync({alter: true})




module.exports = {User, Animal}