const { Sequelize } = require("sequelize")

/*
const username = process.env.DB_USERNAME || "postgres"
const password = process.env.DB_PASSWORD || "123"
const host = process.env.DB_HOSTNAME || "localhost"
const database = process.env.DB_NAME || "postgres"
const port = process.env.DB_PORT || 5432
*/




 
const sequelize = new Sequelize(process.env.DATABASE_URL || "postgres://postgres:123@localhost:5432/postgres", {
  logging: false,
})





module.exports = sequelize