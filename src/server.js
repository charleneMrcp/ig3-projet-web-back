const http = require("http")
const sequelize = require("./config/database")
const app = require("./app")

if (!process.env.NODE_ENV || process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv")
  const result = dotenv.config()
  console.log(".env file loaded")
  if (result.error) {
    throw result.error
  }
}



sequelize.authenticate()
  .then(() =>{
    console.log("Database connection established")
  })
  .catch(err =>{
    console.log("error: " + err)
  })

const port = process.env.PORT

 


const server = http.createServer(app);


server.listen(port, () => {
    console.log(`Server is running on port ${port} at http://localhost:${port}`);
})