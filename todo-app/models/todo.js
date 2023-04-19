"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate(models) {}

    static addTodo({ title, dueDate }) {
      return this.create({ title: title, dueDate: dueDate, completed: false });
    }

    static getTodo() {
      return this.findAll();
    }

    static overdueTodoall() {
      return this.findAll({
        where: {
          dueDate: { [Op.lt]: new Date() },
          completed: false,
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static duetodayTodoall() {
      return this.findAll({
        where: {
          dueDate: { [Op.eq]: new Date() },
          completed: false,
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static duelaterTodoall() {
      return this.findAll({
        where: {
          dueDate: { [Op.gt]: new Date() },
          completed: false,
        },
        order: [["dueDate", "ASC"]],
      });
    }

    static markAsCompletedall() {
      return this.findAll({
        where: {
          completed: true,
        },
        order: [["id", "ASC"]],
      });
    }

    deleteTodo({ todo }) {
      return this.destroy({
        where: {
          id: todo,
        },
      });
    }


    static async remove(id) {
      return this.destroy({
        where: {
          id,
        },
      });
    }

    setCompletionStatus(boolean) {
      return this.update({ completed: boolean });
    }

    markAsCompleted() {
      return this.update({ completed: true });
    }
  }
  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};
