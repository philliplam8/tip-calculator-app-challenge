// @ts-check
const { test, expect } = require('@playwright/test');
const { Calculator } = require('../pages/calculator-page.js');
const { timeout } = require('../playwright.config.js');

test.beforeEach(async ({ page }) => {
    await page.goto('http://127.0.0.1:5501/index.html');

});

test.describe('Reset Button:', () => {

    test('Bill field and People field edited', async ({ page }) => {
        const calculator = new Calculator(page);
        const td = {
            inputBill: '999.99',
            inputTip: '10',
            inputPeople: '2',
            expectedClearTipPerPerson: '$0.00',
            expectedClearAmountPerPerson: '$0.00',
            expectedCalculatedTipPerPerson: '$50.00',
            expectedCalculatedAmountPerPerson: '$549.99'
        }

        // Wait for and verify display is cleared
        await calculator.h1TipPerPerson.waitFor();
        await calculator.h1TotalPerPerson.waitFor();
        expect(await calculator.h1TipPerPerson).toHaveText(td.expectedClearTipPerPerson);
        expect(await calculator.h1TotalPerPerson).toHaveText(td.expectedClearAmountPerPerson);

        // Wait for and verify reset button is disabled
        // expect(await calculator.btnReset).toHaveAttribute('disabled', 'true');
        expect(await calculator.btnReset.isDisabled()).toBe(true);

        // Enter values into the Bill input field and People input field
        await calculator.splitBillWithCustomTip(td.inputBill, td.inputPeople, td.inputTip);
        await page.keyboard.press('Tab');

        // // Wait for and verify display has been updated
        // expect(await calculator.h1TipPerPerson).toHaveText(td.expectedCalculatedTipPerPerson);
        // expect(await calculator.h1TotalPerPerson).toHaveText(td.expectedCalculatedAmountPerPerson);

        // Wait for and verify Reset button is enabled
        await calculator.btnReset.isEnabled();
        // expect(await calculator.btnReset.isEnabled(5)).toBe(true);

        // Click on Reset button
        await calculator.resetCalculator();


        // Wait for and verify reset button is disabled
        // expect(await calculator.btnReset).toHaveAttribute('disabled', 'true');
        expect(await calculator.btnReset.isDisabled()).toBe(true);

        // Wait for and verify display is cleared 
        expect(await calculator.h1TipPerPerson).toHaveText(td.expectedClearTipPerPerson);
        expect(await calculator.h1TotalPerPerson).toHaveText(td.expectedClearAmountPerPerson);
    });

});