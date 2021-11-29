const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    cellphone: {
        type: String,
        required: true,
    },
    onMailingList: {
        type: Boolean,
        required: true,
    }
})

userSchema.pre('save', async function(next) {
    if(this.isModified('password')) {
        this.password = await bcryptjs.hash(this.password,8);
    }
    next();
})

const User = mongoose.model('User',userSchema);

module.exports = User;