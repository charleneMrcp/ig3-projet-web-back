const User = require("./User")
const Animal = require("./Animal")

 

User.sync({alter : true})
Animal.sync({alter: true})




module.exports = {User, Animal}