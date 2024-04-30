const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const animalSchema = new Schema({
    //ім'я тварини
    name: { type: String, required: true },
    //стать
    gender: {type: String, enum: ['female','male']},
    //вид
    species: { type: String, required: true},
    //порода
    breed: {type: String},
    //вік
    age: {type: Number, min: 0},
    //опис
    description: { type: String, required: true},
    //розмір
    size: { type: String, enum: ['tiny','small','medium', 'large'], default: 'small' },
    //чи тварину забирають
    putForAdoption: { type: Boolean, default: false },
    //фото
    photo: { type: String } 
}, { timestamps: true });

//вік тварини має бути не менше 0
animalSchema.path('age').validate(function(value) {
    if (value && (!Number.isInteger(value) || value < 0)) {
        return false;
    }
    return true;
}, 'Вік тварини не може бути менше 0.');

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;

