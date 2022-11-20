/* eslint-disable no-undef */
const todoList = require("../todo");
let today = new Date().toLocaleDateString("en-CA");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("TODO list is being tested", () => {
  beforeAll(() => {
    add({
      title: "painting since the last 2 hours",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("to the exsistting TODO list create a new TODO list", () => {
    // expect(all.length).toBe(0);
    let length = all.length;

    add({
      title: "Finish math assignment",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toBe(length + 1);
  });

  test("a Completed TODO list is marked", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("bring all the pending TODO list back", () => {
    let L = overdue();

    expect(
      L.every((todo) => {
        return todo.dueDate < today;
      })
    ).toBe(true);
  });

  test("retrive all the incomplete TODO'S for today", () => {
    let L = dueToday();

    expect(
      L.every((todo) => {
        return todo.dueDate === today;
      })
    ).toBe(true);
  });

  test("retrive all the incomplete TODO'S for later", () => {
    let L = dueLater();

    expect(
      L.every((todo) => {
        return todo.dueDate > today;
      })
    ).toBe(true);
  });
});
