const express = require('express');
const router = express.Router();
const AnimalController = require('../controllers/controller');

const animalController = new AnimalController();

// CREATE
router.post('/animals', animalController.create);

// READ
router.get('/animals', animalController.getAll);
router.get('/animals/:id', animalController.getOne);

// UPDATE
router.put('/animals/:id', animalController.update);
router.put('/animals/:id/adopt', animalController.markAdopted);

// DELETE
router.delete('/animals/:id', animalController.delete);

module.exports = router;
