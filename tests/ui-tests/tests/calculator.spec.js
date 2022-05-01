// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://philliplam8.github.io/tip-calculator-app-challenge/');
});

test.describe('Bill Input Field:', () => {

    test('Input value has no decimals', async ({ page }) => {

        const td = {
            inputBill: '100',
            inputPeople: '2',
            expectedBillValue: '100.00'
        }

        let inpBill = page.locator('#bill-input');
        let inpPeople = page.locator('#people-input');

        // Enter values into the Bill input field and People input field
        await inpBill.fill(td.inputBill);
        await inpPeople.fill(td.inputPeople);

        // Wait for and verify input Bill input field auto-appends decimals to the hundredth place
        await expect(inpBill).toHaveValue(td.expectedBillValue);
    });

    test('Input value has decimal, but no tenth digit', async ({ page }) => {

        const td = {
            inputBill: '50.',
            inputPeople: '2',
            expectedBillValue: '50.00'
        }

        let inpBill = page.locator('#bill-input');
        let inpPeople = page.locator('#people-input');

        // Input values
        await inpBill.fill(td.inputBill);
        await inpPeople.fill(td.inputPeople);

        // Wait for and verify input Bill input field auto-appends decimals to the hundredth place
        await expect(inpBill).toHaveValue(td.expectedBillValue);
    });

    test('Input value has decimal, but no hundreth digit', async ({ page }) => {

        const td = {
            inputBill: '100.1',
            inputPeople: '2',
            expectedBillValue: '100.10'
        }

        let inpBill = page.locator('#bill-input');
        let inpPeople = page.locator('#people-input');

        // Input values
        await inpBill.fill(td.inputBill);
        await inpPeople.fill(td.inputPeople);

        // Wait for and verify input Bill input field auto-appends decimals to the hundredth place
        await expect(inpBill).toHaveValue(td.expectedBillValue);
    });
});