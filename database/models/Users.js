const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password:String,
   
    
})


UserSchema.pre('save', (next) => {
    const user = this

    bcrypt.hash(user.password, 10, (erro, encrypted) =>{
        user.password = encrypted 
        next()
    })
})

module.exports = mongoose.model('User', UserSchema);