const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Petsitter = sequelize.define("Petsitter", {

sitter_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
},
vehicule: {type: DataTypes.BOOLEAN, allowNull: true},
surface: {type: DataTypes.INTEGER, allowNull: false},
exp_desc:  {type: DataTypes.TEXT, allowNull: false},
loge_desc:  {type: DataTypes.TEXT, allowNull: true},
motiv_desc:  {type: DataTypes.TEXT, allowNull: false},
exterieur:  {type: DataTypes.BOOLEAN, allowNull: false}


},
{ tableName: "Petsitter", freezeTableName: true, timestamps: false}
)



module.exports = Petsitter

 