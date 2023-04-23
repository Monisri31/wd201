const express = require("express");
const { Todo } = require("./models");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.set("view engine", "ejs");

app.get("/", async (request, response) => {
  const getAllTodosManager = await Todo.getTodoItemsAll();
  if (request.accepts("html")) {
    response.render("index", { getAllTodosManager });
  } else {
    response.json(getAllTodosManager);
  }
});

app.get("/todos", async function (_request, response) {
  try {
    const todo = await Todo.getTodoItemsAll();
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.get("/todos/:id", async function (request, response) {
  try {
    const todo = await Todo.findByPk(request.params.id);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.post("/todos", async function (request, response) {
  try {
    const todo = await Todo.addItems(request.body);
    return response.json(todo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.put("/todos/:id/markAsCompleted", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const updateTodo = await todo.markAsCompleted();
    return response.json(updateTodo);
  } catch (error) {
    console.log(error);
    return response.status(422).json(error);
  }
});

app.delete("/todos/:id", async function (request, response) {
  const todo = await Todo.findByPk(request.params.id);
  try {
    const deleteTodoItem = await todo.deleteItems({ todo: request.params.id });
    return response.send(true);
  } catch (error) {
    console.log(error);
    return response.send(false);
  }
});

module.exports = app;
