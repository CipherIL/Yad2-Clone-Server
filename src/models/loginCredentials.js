const mongoose = require('mongoose');

const loginCredentialsSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    }
})

const LoginCredentials = mongoose.model('LoginCredentials',loginCredentialsSchema);

module.exports = LoginCredentials;