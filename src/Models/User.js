const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const User = sequelize.define("User", {

user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
},

nom: {type: DataTypes.STRING, allowNull: false},
prenom: {type: DataTypes.STRING, allowNull: false},
age: {type: DataTypes.INTEGER, allowNull: false},
tel:  {type: DataTypes.STRING, allowNull: false},
mail:  {type: DataTypes.STRING, allowNull: false},
mdp:  {type: DataTypes.STRING, allowNull: false},
sexe:  {type: DataTypes.STRING, allowNull: false},
is_sitter:  {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
addr:  {type: DataTypes.STRING, allowNull: false},
code_post:  {type: DataTypes.INTEGER, allowNull: false},
logement:  {type: DataTypes.STRING, allowNull: false}

},
{ tableName: "User", freezeTableName: true, timestamps: false}
)



module.exports = User

