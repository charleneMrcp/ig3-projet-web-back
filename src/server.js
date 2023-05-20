const http = require("http")
const sequelize = require("./config/database")
const app = require("./app")
sequelize.authenticate()
  .then(() =>{
    console.log("Database connection established")
  })
  .catch(err =>{
    console.log("error: " + err)
  })

const port = process.env.PORT || 3000

 


const server = http.createServer(app);

console.log("let's go")
server.listen(port, () => {
    console.log(`Server is running on port ${port} at http://localhost:${port}`);
})