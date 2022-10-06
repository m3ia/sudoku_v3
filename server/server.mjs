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

// GET - Get all problems and solutions
app.get('/problems', async function (req, res) {
  try {
    const problems = await db.any('SELECT problems.id, problems.problem, solutions.solution FROM solutions LEFT JOIN problems ON problems.id=solutions.problem_id ORDER BY problems.id');
    res.send(problems);
  } catch (e) {
    return res.status(400).json({ e });
  }
});
