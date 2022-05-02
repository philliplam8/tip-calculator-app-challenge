// @ts-check
const { test, expect } = require('@playwright/test');
const { Calculator } = require('../pages/calculator-page.js');

test.beforeEach(async ({ page }) => {
    await page.goto('https://philliplam8.github.io/tip-calculator-app-challenge/');

});

test.describe('Bill Input Field:', () => {

    test('Input value has no decimals', async ({ page }) => {
        const calculator = new Calculator(page);
        const td = {
            inputBill: '100',
            inputPeople: '2',
            expectedBillValue: '100.00'
        }

        // Enter values into the Bill input field and People input field
        await calculator.inpBill.fill(td.inputBill);
        await calculator.inpPeople.fill(td.inputPeople);

        // Wait for and verify input Bill input field auto-appends decimals to the hundredth place
        await expect(calculator.inpBill).toHaveValue(td.expectedBillValue);
    });

    test('Input value has decimal, but no tenth digit', async ({ page }) => {
        const calculator = new Calculator(page);
        const td = {
            inputBill: '50.',
            inputPeople: '2',
            expectedBillValue: '50.00'
        }

        // Input values
        await calculator.inpBill.fill(td.inputBill);
        await calculator.inpPeople.fill(td.inputPeople);

        // Wait for and verify input Bill input field auto-appends decimals to the hundredth place
        await expect(calculator.inpBill).toHaveValue(td.expectedBillValue);
    });

    test('Input value has decimal, but no hundreth digit', async ({ page }) => {
        const calculator = new Calculator(page);
        const td = {
            inputBill: '100.1',
            inputPeople: '2',
            expectedBillValue: '100.10'
        }

        // Input values
        await calculator.inpBill.fill(td.inputBill);
        await calculator.inpPeople.fill(td.inputPeople);

        // Wait for and verify input Bill input field auto-appends decimals to the hundredth place
        await expect(calculator.inpBill).toHaveValue(td.expectedBillValue);
    });
});