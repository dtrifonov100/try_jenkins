const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8000;

const todos = [
  {
    id: 1,
    title: 'Write code',
    completed: false,
  },
];
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/todos', (req, res) => {
  res
    .status(200)
    .json({ message: 'hello back to nodejs', name: process.env.NAME, todos });
});
app.get('/api/todos/create', (req, res) => {
  const { title = 'New ToDo' } = req.body;
  if (!title)
    return res.status(400).json({ error: 'Title is required for a todo.' });
  const newTodo = {
    id: todos.length + 1,
    title,
    completed: false,
  };
  todos.push(newTodo);

  res.status(201).json(newTodo);
});

app.get('/', (req, res) => {
  const date = new Date();
  res.send({
    date: date.toString(),
    iso: date.toISOString(),
    utc: date.toUTCString(),
  });
});
app.listen(PORT, () => {
  console.log(`Server is started on PORT=${PORT}`);
});
