const User = require("./User")
const Animal = require("./Animal")
const Petsitter = require("./Petsitter")
const Reservation = require("./Reservation")
const Activite = require("./Activite")


User.hasMany(Animal, { foreignKey: { name: 'user_id', allowNull: false }, onDelete: 'CASCADE' })
Animal.belongsTo(User, { foreignKey: 'user_id' })

User.hasOne(Petsitter, { foreignKey: { name: 'user_id', allowNull: false }, onDelete: 'CASCADE' })
Petsitter.belongsTo(User, { foreignKey: 'user_id' })

// To do : rajouter une sécurité à delete user pour qu'il delete aussi sitter si il y a
Petsitter.hasMany(Reservation, { foreignKey: { name: 'sitter_id', allowNull: false }, onDelete: 'CASCADE' })
Reservation.belongsTo(Petsitter, { foreignKey: 'sitter_id' });

Animal.hasMany(Reservation,{foreignKey: {name:'pet_id', allowNull: false}})
Reservation.belongsTo(Animal,{foreignKey: 'pet_id'});

Activite.hasMany(Reservation,{foreignKey: {name:'libelle_acti', allowNull: false}})
Reservation.belongsTo(Activite,{foreignKey: 'libelle_acti'});






(async () => {
    await User.sync({ alter: true }).then(() => {
        console.log("Table User créée")
    })
    await Animal.sync({ alter: true }).then(() => {
        console.log("Table Animal créée")
    })
    await Petsitter.sync({ alter: true }).then(() => {
        console.log("Table Petsitter créée")
    })
    await Reservation.sync({ alter: true }).then(() => {
        console.log("Table Reservation créée")
    })
    await Activite.sync({ alter: true }).then(() => {
        console.log("Table Activite créée")
    })
})()

/*
const activites = [{ libelle_acti: " Balade " }, { libelle_acti: " Garde domicile Petsitter " }, { libelle_acti: "Garde domicile client" }]
activites.forEach(element => {
    Activite.create(element)
})
*/

module.exports = { User, Animal, Petsitter, Reservation, Activite }