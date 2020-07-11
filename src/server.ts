import express from 'express';

const app = express();

app.get('/users', (req, res) => {
    console.log('Teste');
    res.send('AA')
});

app.listen(3333);