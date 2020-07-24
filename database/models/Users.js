const bcrypt = require('bcrypt')
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Le nom est oblgatoire']
    },
    email: {
        type: String,
        required: [true, 'L\' adresse mail est oblgatoire'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Le mot de passe est oblgatoire']
    },
   
    
})


UserSchema.pre('save', function (next){
    const user = this

    bcrypt.hash(user.password, 10, (error, encrypted) =>{
        user.password = encrypted 
        next()
    })
})

module.exports = mongoose.model('User', UserSchema);