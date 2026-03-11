require('dotenv').config()
const app = require('./src/app')

const connectToDB = require('./src/config/db')

connectToDB()
.then(()=>{
    app.listen(3000,()=>{
        console.log("Server is running on 3000");
        
    })
})
.catch((error)=>{
    console.log("Database connection failed",error);
    
})

