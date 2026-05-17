import { Locator, Page, expect } from "@playwright/test";

export class Footer {
    readonly root: Locator;
    readonly allFilter: Locator;
    readonly activeFilter: Locator;
    readonly completedFilter: Locator;
    readonly clearCompletedButton: Locator;

    constructor(private page: Page) {
        this.root = page.getByTestId('footer-navigation');
        this.allFilter = this.root.locator('["href#/All"]');
        this.activeFilter = this.root.locator('[href="#/active"]');
        this.completedFilter = this.root.locator('[href="#/completed"]');
        this.clearCompletedButton = this.root.getByText('Clear completed');
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