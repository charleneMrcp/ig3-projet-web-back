const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")

const Reservation = sequelize.define("Reservation", {

res_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
},
validation: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},

date_debut: {type: DataTypes.DATEONLY, allowNull: false},
date_fin: {type: DataTypes.DATEONLY, allowNull: false},
h_debut:{type: DataTypes.TIME, allowNull: false},
h_fin:{type: DataTypes.TIME, allowNull: false},
quick_desc:  {type: DataTypes.STRING, allowNull: true},
prix_final:  {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}

},
{ tableName: "Reservation", freezeTableName: true, timestamps: true}
)



module.exports = Reservation

 