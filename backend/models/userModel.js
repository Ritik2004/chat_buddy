const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        pic:{
            type:String,
            
            default:"https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
        },
    },
            {
                timestamps:true
            }
    )

    userSchema.methods.matchPassword = async function (enteredPassword) {
        return await bcrypt.compare(enteredPassword, this.password);
      };
      

    //if the password id saved for first time we will hash it
    userSchema.pre('save', async function(next){
        if(!this.isModified){
            next()
        }
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password,salt)
    })
    const User = mongoose.model("User",userSchema);

    module.exports = User