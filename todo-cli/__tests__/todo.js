const todoList = require("../todo");  // For Testing
const { all, markAsComplete, add, overdue, dueLater, dueToday } = todoList();

describe("Todo New Test Suite", () => {
  beforeAll(() => {
    add({
      title: "Test2",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .slice(0, 10),
    });
    add({
      title: "Today fun",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    add({
      title: "Test Due Later",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
        .toISOString()
        .slice(0, 10),
    });
  });
  test("add new todo", () => {
    const store_todo = all.length;
    add([
      {
        title: "Test Over Due",
        completed: false,
        dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
          .toISOString()
          .slice(0, 10),
      },
    ]);
    expect(all.length).toBe(store_todo + 1);
  });

  test("Should mark a todo as complete", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("retreive Overdue", () => {
    add({
      title: "Test Over today",
      completed: false,
      dueDate: new Date(new Date().setDate(new Date().getDate() - 1))
        .toISOString()
        .slice(0, 10),
    });
    expect(
      all.filter((item) => item.dueDate < new Date().toISOString().slice(0, 10))
        .length
    ).toBe(2);
  });

  test("retreive of due today", () => {
    add({
      title: "Test Due Today",
      completed: false,
      dueDate: new Date().toISOString().slice(0, 10),
    });
    expect(
      all.filter(
        (item) => item.dueDate === new Date().toISOString().slice(0, 10)
      ).length
    ).toBe(2);
  });
});

test("Overdue item recived", () => {
  add({
    title: "Test 4",
    completed: false,
    dueDate: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .slice(0, 10),
  });
  expect(
    all.filter((item) => item.dueDate > new Date().toISOString().slice(0, 10))
      .length
  ).toBe(2);
});
