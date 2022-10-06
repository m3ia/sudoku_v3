import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import pgPromise from 'pg-promise';

const app = express();
const PORT = 8080;
const pgp = pgPromise({});
const db = pgp('postgres://localhost:5432/sudoku');

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log((`Hola this server is running on port ${PORT}`));
});

app.get('/', (req, res) => {
  res.json('Hellooooo');
});

