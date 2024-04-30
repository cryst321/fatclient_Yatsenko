const mongoose = require('mongoose');
const Animal = require('./models/animal');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/shelter', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');

        // Generate and save 20 test animals
        const testAnimals = generateTestAnimals(20);
        saveTestAnimals(testAnimals);
    })
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Function to generate test animals
function generateTestAnimals(numAnimals) {
    const animals = [];
    const speciesOptions = ['dog', 'cat', 'rabbit'];
    const genderOptions = ['female', 'male'];
    const sizeOptions = ['tiny', 'small', 'medium', 'large'];

    for (let i = 0; i < numAnimals; i++) {
        const animal = {
            name: `Animal${i + 1}`,
            species: speciesOptions[Math.floor(Math.random() * speciesOptions.length)],
            gender: genderOptions[Math.floor(Math.random() * genderOptions.length)],
            size: sizeOptions[Math.floor(Math.random() * sizeOptions.length)],
            age: Math.floor(Math.random() * 10),
            description: `This is Animal${i + 1}.`,
            putForAdoption: Math.random() < 0.2
        };
        animals.push(animal);
    }
    return animals;
}

// Function to save test animals to the database
async function saveTestAnimals(testAnimals) {
    try {
        const savedAnimals = await Animal.insertMany(testAnimals);
        console.log('Test animals added to database:', savedAnimals.length);
        mongoose.connection.close();
    } catch (err) {
        console.error('Error saving test animals:', err);
        mongoose.connection.close();
    }
}
