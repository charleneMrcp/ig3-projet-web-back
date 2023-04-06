const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Animal = sequelize.define("Animal", {

pet_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
},

nom_pet: {type: DataTypes.STRING, allowNull: false},
type: {type: DataTypes.STRING, allowNull: false},
sexe: {type: DataTypes.STRING, allowNull: false},
age: {type: DataTypes.INTEGER, allowNull: false},
taille: {type: DataTypes.INTEGER, allowNull: false},
poids: {type: DataTypes.INTEGER, allowNull: false},
race: {type: DataTypes.STRING, allowNull: false},
vs_dog: {type: DataTypes.BOOLEAN, allowNull: false},
vs_cat: {type: DataTypes.BOOLEAN, allowNull: false},
vs_humain: {type: DataTypes.BOOLEAN, allowNull: false},
vs_enfants: {type: DataTypes.BOOLEAN, allowNull: false},
desc_gene: {type: DataTypes.STRING, allowNull: false}
},
{ tableName: "Animal", freezeTableName: true, timestamps: false}
)

module.exports = Animal
