const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log('Server is running on port: ' + PORT + '!')
})

app.get("/jokebook/categories", (req, res) => {
    res.json(categories);
})

app.get('/jokebook/joke/:category', (req, res) => {
    const category = req.params.category;
    const limit = req.query.limit;

    let jokeList;

    if (category === 'funnyJoke') {
        jokeList = funnyJoke;
    } else if (category === 'lameJoke') {
        jokeList = lameJoke;
    } else {
        return res({'error': `Category "${category}" not found`})
    }

    if (limit) {
        jokeList = jokeList.slice(0, limit);
    }

    res.json(jokeList)
})

app.post('/jokebook/joke/new', (req, res) => {
    const { category, joke, response } = req.body;

    if (!category || !joke || !response || !categories.includes(category)) {
        return res.status(400).json( {'error': 'Invalid or incomplete input'} )
    }

    let jokeList;

    if (category === 'funnyJoke'){
        funnyJoke.push( {joke, response} )
        jokeList = funnyJoke
    } else if (category === 'lameJoke') {
        lameJoke.push( {joke, response} )
        jokeList = lameJoke
    }

    res.json(jokeList)
})

let categories = ['funnyJoke', 'lameJoke'];
let funnyJoke = [
    {
        'joke': 'Why don\'t scientists trust atoms?',
        'response': 'Because they make up everything!'
    },
    {
        'joke': 'Why did the scarecrow win an award?',
        'response': 'Because he was outstanding in his field!'
    },
    {
        'joke': 'How does a penguin build its house?',
        'response': 'Igloos it together!'
    }

];
let lameJoke = [
    {
        'joke': 'Why don\'t skeletons fight each other?',
        'response': 'They don\'t have the guts!'
    },
    {
        'joke': 'Why did the bicycle fall over?',
        'response': 'Because it was two-tired!'
    },
    {
        'joke': 'Why don\'t eggs tell jokes?',
        'response': 'Because they\'d crack each other up!'
    }
];
