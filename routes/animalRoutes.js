const express = require('express');
const router = express.Router();
const AnimalController = require('../controllers/controller');

const animalController = new AnimalController();

// CREATE
router.post('/', animalController.create);

// READ
router.get('/', animalController.getAll);
// Випадкова тварина в притулку
router.get('/random', animalController.getRandomAnimal);
// Додаткова бізнес-логіка
// Фільтрування за параметрами
router.get('/filter', animalController.filterAnimals);
// Пошук тварини за іменем
router.get('/search', animalController.searchAnimals);
// Статистика по тваринам в притулку
router.get('/statistics', animalController.getStatistics);
router.get('/:id', animalController.getOne);


// UPDATE
router.put('/:id', animalController.update);

// DELETE
router.delete('/:id', animalController.delete);



module.exports = router;
