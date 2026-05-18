import { test } from '@playwright/test';
import {ToDoPage} from "../pages/ToDoPage";

  test('Create ToDo items and filter by All', async ({page}) => {
    const toDoPage = new ToDoPage(page);
    await toDoPage.goto();
    for (let i = 0; i < 6; i++) {
      await toDoPage.createToDoItem();
    }
    await toDoPage.checkToDoItemVisible(6);
    await toDoPage.footer.clickAll();
  })

  test('Activate card test -search by text', async ({page}) => {
    const cardText = 'testing'
    const toDoPage = new ToDoPage(page);
    await toDoPage.goto();
    for (let i = 0; i < 6; i++) {
      await toDoPage.createToDoItem();
    }
    const createToDo = await toDoPage.createToDoItem(cardText);
    await toDoPage.checkToDoItemVisible(7)
    const createdToDo = toDoPage.getToDoItemByText(cardText);
    await createToDo.activate();
    await createToDo.checkIsActivated();
  })
  test('Create todos, complete one and filter by completed', async ({page}) => {
    const toDoPage = new ToDoPage(page);
    await toDoPage.goto();
    for (let i = 0; i < 6; i++) {
      await toDoPage.createToDoItem();
    }
    const createToDo = toDoPage.getToDoItemByIndex(4);
    await createToDo.activate();
    await toDoPage.footer.clickCompleted();
    await toDoPage.checkToDoItemVisible(1);
  })
  test('Create todos, complete one and delete by Clear completed', async ({page}) => {
    const toDoPage = new ToDoPage(page);
    await toDoPage.goto();
    for (let i = 0; i < 6; i++) {
      await toDoPage.createToDoItem();
    }
    const createToDo = toDoPage.getToDoItemByIndex(4);
    await createToDo.activate();
    await toDoPage.footer.clearCompleted();
    await toDoPage.checkToDoItemVisible(5);
  })

  test('Delete card test', async ({page}) => {
    const toDoPage = new ToDoPage(page);
    await toDoPage.goto();
    for (let i = 0; i < 6; i++) {
      await toDoPage.createToDoItem();
    }
    const createToDo = toDoPage.getToDoItemByIndex(1);
    await createToDo.deleteItem();
    await toDoPage.checkToDoItemVisible(5);
  })






