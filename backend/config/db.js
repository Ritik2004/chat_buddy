const mongoose = require("mongoose")

const connectDb = async () => {
    try{
         const conn = await mongoose.connect(process.env.MONGO_URI)
          console.log('mongodb connected')
        }
    catch(error){
         console.log(`Error:${error.message}`)
    }
}

module.exports = connectDb;