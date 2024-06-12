import mongoose from "mongoose"

 export const dbconnection = async () => {
       try {
        // console.log (process.env.MONGO_URI) ; 
           await mongoose.connect(process.env.MONGO_URI , {dbName:"ERP4EDU"}) ; 
           console.log("Database connnected successfully !!!")
       } catch (error) {
           console.log("there is some error in database connection :: " , error)
       }  
 }