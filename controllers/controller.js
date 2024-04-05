const Animal = require('../models/animal');
const { validationResult } = require('express-validator');

class AnimalController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const { name, species, breed, size, age } = req.body;
            const newAnimal = new Animal({ name, species, breed, size, age });
            await newAnimal.save();
            res.status(201).json({ message: 'Animal created successfully', animal: newAnimal });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const animals = await Animal.find();
            res.json(animals);
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            const animal = await Animal.findById(req.params.id);
            if (!animal) {
                return res.status(404).json({ message: 'Animal not found' });
            }
            res.json(animal);
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const { name, species, breed, size, age } = req.body;
            await Animal.findByIdAndUpdate(req.params.id, { name, species, breed, size, age });
            res.json({ message: 'Animal updated successfully' });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            await Animal.findByIdAndDelete(req.params.id);
            res.json({ message: 'Animal deleted successfully' });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = AnimalController;
