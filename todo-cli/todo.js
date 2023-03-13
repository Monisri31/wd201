const todoList = () => {
  all = [];
  const add = (todoItem) => {
    all.push(todoItem);
  };
  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    const ov = all.filter(
      (item) => item.dueDate.split("-")[2] < new Date().getDate()
    );
    return ov;
  };

  const dueToday = () => {
    const bt = all.filter(
      (item) => item.dueDate.split("-")[2] === String(new Date().getDate())
    );
    return bt;
  };

  const dueLater = () => {
    const bla = all.filter(
      (item) => item.dueDate.split("-")[2] > new Date().getDate()
    );
    return bla;
  };

  const toDisplayableList = (list) => {
    const result = list.map(
      (item) =>
        `${item.completed ? "[x]" : "[ ]"} ${item.title} ${
          item.dueDate.split("-")[2] === String(new Date().getDate())
            ? ""
            : item.dueDate
        }`
    );

    return result.join("\n");
  };

  return {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
  };
};
module.exports = todoList;
