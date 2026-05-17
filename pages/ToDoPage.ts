import {expect, Locator, Page} from "@playwright/test";
import {ToDoItem} from "../organisms/ToDoItem";
import {faker} from "@faker-js/faker/locale/en";
import {Footer} from "./Footers";

export class ToDoPage {
    readonly page: Page;
    private readonly url = 'https://todo-app.tallinn-learning.ee'
    readonly header:Locator;
    readonly main:Locator;
    readonly footer:Footer;
    readonly toDoItemInput:Locator;
    //readonly externalFooter:Locator;

    constructor(page:Page) {
        this.page =page;
        this.header =page.getByTestId('header');
        this.main =page.getByTestId('main');
        this.footer = new Footer(page);
        this.toDoItemInput =page.getByTestId('text-input');

    }
     getToDoItemByIndex(index:number):ToDoItem{
        return new ToDoItem(this.main.getByTestId('todo-item').nth(index))
    }
     getToDoItemByText(text:string):ToDoItem {
        return new ToDoItem(this.main.locator('[data-testid="todo-item"]',{hasText: text}));
    }

    async goto(): Promise<void> {
        await this.page.goto(this.url);
    }
    async createToDoItem(text?:string):Promise<ToDoItem> {
        await this.toDoItemInput.fill(text==undefined?faker.word.words(2):text);
        await this.toDoItemInput.press('Enter');
        const toDoItems = this.main.getByTestId('todo-item');
        const itemsCount: number = await toDoItems.count();
        return this.getToDoItemByIndex(itemsCount - 1);
    }
async checkToDoItemVisible(expectedCount:number):Promise<void> {
     // const toDoItems:ToDoItem[] = this.main.getByTestId('todo-item');
     const itemCount:number = await this.main.getByTestId('todo-item').count();
        expect(itemCount).toBe(expectedCount);

    }


}