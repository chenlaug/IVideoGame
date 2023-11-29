const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const validator = require('validator');

const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!-_.*]).{8,}$/;
const userSchema = new Schema(
    {
        lastName: { type: String, required: true },
        firstName: { type: String, required: true },
        phone: { type: String, required: true, unique: true },
        birthday: { type: Date, required: true },
        password: {
            type: String,
            required: true,
            validate: {
                validator: function (value) {
                    return validator.matches(value, passwordRegex);
                },
                message:
                    'Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule et un chiffre.',
            },
        },
        email: { type: String, required: true, unique: true, lowercase: true },
        role: { type: String, required: true, enum: ['user', 'admin'], default: 'user' },
        favorisGames: [{ type: Schema.Types.ObjectId, ref: 'VideoGame' }],
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comments' }],
        confirmationToken: { type: String },
        confirmationTokenExpires: { type: Date },
        confirmed: { type: Boolean, default: false },
    },
    { timestamps: true },
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
