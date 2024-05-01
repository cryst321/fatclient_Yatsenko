const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const app = express();
const path = require('path');
const cors = require('cors');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.use(cors());

app.use(express.json());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
}));

mongoose.connect('mongodb://127.0.0.1:27017/shelter', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));



const animalRouter = require('./routes/animalRoutes');

app.use('/animals', animalRouter);
app.get('/', (req, res) => {
    const user = req.session.user;
    res.render('index', { title: 'Home', user: null });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

