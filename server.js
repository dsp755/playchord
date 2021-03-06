const express = require('express')

const app = express();

const port = 3000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});

app.use(express.static('dist'));

const link = './'

app.get('/', (req, res) => {
    res.sendFile('./dist/index.html', {root: link})
});

app.get('/test', (req, res) => {
    console.log('test opened')
    res.sendFile('./dist/index_test.html', {root: link})
});

// app.get('/preset', (req, res) => {
//     console.log('preset')
//     res.sendFile('./dist/preset.json', {root: link})
// });