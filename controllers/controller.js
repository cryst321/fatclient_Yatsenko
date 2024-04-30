const Animal = require('../models/animal');
const { validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');


class AnimalController {

    // CREATE
    create = asyncHandler(async (req, res) => {
        const newAnimal = await Animal.create(req.body);
        res.status(201).json(newAnimal);
    });

    // READ - Всі тварини
    getAll = asyncHandler(async (req, res) => {
        const animals = await Animal.find();
        res.status(200).json(animals);
    });

    // READ - За айді
    getOne = asyncHandler(async (req, res) => {
        const animal = await Animal.findById(req.params.id);
        if (!animal) {
            res.status(404).json({ message: 'Тварину не знайдено.' });
            return;
        }
        res.status(200).json(animal);
    });



    // UPDATE
    update = asyncHandler(async (req, res) => {
        const { name, gender, species, breed, age, description, size, putForAdoption } = req.body;
        await Animal.findByIdAndUpdate(req.params.id, { name, gender, species, breed, age, description, size,putForAdoption});
        res.json({ message: 'Тварину успішно оновлено.' });
    });


    // DELETE
    delete = asyncHandler(async (req, res) => {
        await Animal.findByIdAndDelete(req.params.id);
        res.json({ message: 'Тварину успішно видалено.' });
    });

    //Випадкова тварина
    getRandomAnimal = asyncHandler(async (req, res) => {
        const count = await Animal.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomAnimal = await Animal.findOne().skip(randomIndex);
        res.status(200).json(randomAnimal);
    });


    //Пошук за іменем
    searchAnimals = asyncHandler(async (req, res) => {
        const query = req.query.q;
        const animals = await Animal.find({ name: { $regex: query, $options: 'i' } });
        res.status(200).json(animals);
    });


    //Фільтрація тварин за: стать, розмір, вид, вік
    filterAnimals = asyncHandler(async (req, res) => {
        let filter = {};

        if (req.query.gender) {
            filter.gender = req.query.gender;
        }

        if (req.query.size) {
            filter.size = req.query.size;
        }

        if (req.query.species) {
            filter.species = req.query.species;
        }


        if (req.query.ageMin) {
            const ageMin = parseInt(req.query.ageMin);
            if (!isNaN(ageMin)) {
                filter.age = { ...filter.age, $gte: ageMin };
            }
        }

        if (req.query.ageMax) {
            const ageMax = parseInt(req.query.ageMax);
            if (!isNaN(ageMax)) {
                filter.age = { ...filter.age, $lte: ageMax };
            }
        }

        if (req.query.forAdoption !== undefined) {
            filter.putForAdoption = req.query.forAdoption === 'true';
        }


        const animals = await Animal.find(filter);
        res.status(200).json(animals);
    });


//Статистика притулку
    getStatistics = asyncHandler(async (req, res) => {
        const totalAnimals = await Animal.countDocuments();

        const totalDogs = await Animal.countDocuments({ species: 'dog' });
        const totalCats = await Animal.countDocuments({ species: 'cat' });

        const oldestAnimal = await Animal.findOne().sort({ age: -1 });

        const totalAdopted = await Animal.countDocuments({ putForAdoption: true });
        const adoptionPercentage = (totalAdopted / totalAnimals) * 100;

        res.status(200).json({
            totalAnimals,
            totalDogs,
            totalCats,
            oldestAge: oldestAnimal ? oldestAnimal.age : null,
            adoptionPercentage
        });
    });



}

module.exports = AnimalController;
