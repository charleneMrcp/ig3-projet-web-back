const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Activite = sequelize.define("Activite", {
    libelle_acti : {type: DataTypes.STRING, allowNull: true, primaryKey: true}
},
{ tableName: "Activite", freezeTableName: true, timestamps: false}
)



module.exports = Activite
