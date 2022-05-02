// calculator-page.js

exports.Calculator = class Calculator {

    constructor(page) {

        // Elements
        this.inpBill = page.locator('#bill-input');
        this.inpPeople = page.locator('#people-input');
        this.inpCustomTip = page.locator('#custom');
        this.h1TipPerPerson = page.locator('#tip-per-person');
        this.h1TotalPerPerson = page.locator('#total-per-person');
        this.btnReset = page.locator('#reset-button');
    }


    // Functions

    async splitBillWithCustomTip(bill, people, customTip) {

        // Fill in Bill field
        await this.inpBill.click();
        await this.inpBill.fill(bill);

        // Fill in Custom Tip field
        await this.inpBill.click();
        await this.inpCustomTip.fill(customTip);

        // Fill in People field
        await this.inpBill.click();
        await this.inpPeople.fill(people);
    }

    async resetCalculator() {
        await this.btnReset.isEnabled();
        await this.btnReset.click();
    }

}