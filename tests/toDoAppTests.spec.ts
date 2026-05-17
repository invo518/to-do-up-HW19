import { test, expect } from '@playwright/test';
import {ToDoPage} from "../pages/ToDoPage";
import {Footer} from "../pages/Footers";

test('Create ToDo item', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  await toDoPage.checkToDoItemVisible(0)
  await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemVisible(1);
})
test('Create 2 ToDo items, complete one and clear completed', async ({ page }) => {
  const toDoPage = new ToDoPage(page);

  await toDoPage.goto();
  const first = await toDoPage.createToDoItem();
  const second = await toDoPage.createToDoItem();
  await toDoPage.createToDoItem();
  await first.activate();

  await first.checkIsActivated();

  await expect(page.getByText('Clear completed')).toBeEnabled();

  await page.getByText('Clear completed').click();
});

test('Activate card test -search by text', async ({ page }) => {
  const cardText  ='testing'
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  const createToDo = await toDoPage.createToDoItem(cardText);
  await toDoPage.checkToDoItemVisible(1)
  const createdToDo = toDoPage.getToDoItemByText(cardText);

  await createToDo.activate();
  await createToDo.checkIsActivated();
})
test('Create 2 todos, complete one and filter by completed', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  const first = await toDoPage.createToDoItem();
  const second = await toDoPage.createToDoItem();
  //await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemVisible(2);
  await second.activate();
  await second.checkIsActivated();
  await toDoPage.footer.clickCompleted();
  //await toDoPage.footer.clearCompleted()
  //await toDoPage.checkToDoItemVisible(1);
});
test('Delete card test', async ({ page }) => {
  const toDoPage = new ToDoPage(page);
  await toDoPage.goto();
  const createToDo = await toDoPage.createToDoItem();
  await toDoPage.checkToDoItemVisible(1)

  await createToDo.deleteItem()
  await toDoPage.checkToDoItemVisible(0);
})



