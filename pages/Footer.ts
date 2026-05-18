import { Locator, Page, expect } from "@playwright/test";

export class Footer {
    readonly filters: Locator;
    readonly allFilter: Locator;
    readonly activeFilter: Locator;
    readonly completedFilter: Locator;
    readonly clearCompletedButton: Locator;

    constructor(private page: Page) {
        this.filters = page.getByTestId('footer-navigation');
        this.allFilter = page.locator('[href="#/"]');
        this.activeFilter = page.locator('[href="#/active"]');
        this.completedFilter = page.locator('[href="#/completed"]');
        this.clearCompletedButton = page.locator('.clear-completed');
    }

    async clickAll() {
        await this.allFilter.click();
    }

    async clickActive() {
        await this.activeFilter.click();
    }

    async clickCompleted() {
        await this.completedFilter.click();
    }

    async clearCompleted() {
        await this.clearCompletedButton.click();
    }
}