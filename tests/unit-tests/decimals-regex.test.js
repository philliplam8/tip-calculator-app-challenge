import { jest } from '@jest/globals'
import { decimalsRegex } from "../../utils/helpers.util";

test('Input has no decimals, 1 => 1.00', () => {
    // Test Data
    const td = {
        inputString: '1',
        expectedResult: '1.00'
    }
    expect(decimalsRegex(td.inputString)).toEqual(td.expectedResult);
});

test('Input has a decimal but no digits, 50. => 50.00', () => {
    // Test Data
    const td = {
        inputString: '50.',
        expectedResult: '50.00'
    }
    expect(decimalsRegex(td.inputString)).toEqual(td.expectedResult);
});

test('Input has a decimal but only 1 digit 2.9 => 2.90', () => {
    // Test Data
    const td = {
        inputString: '2.9',
        expectedResult: '2.90'
    }
    expect(decimalsRegex(td.inputString)).toEqual(td.expectedResult);
});

test('Input has a decimal and 2 digits 2.99 => 2.99', () => {
    // Test Data
    const td = {
        inputString: '2.99',
        expectedResult: '2.99'
    }
    expect(decimalsRegex(td.inputString)).toEqual(td.expectedResult);
});

test('Input has a decimal and more than 2 digits 3.333333 => 3.333333', () => {
    // Test Data
    const td = {
        inputString: '3.333333',
        expectedResult: '3.333333'
    }
    expect(decimalsRegex(td.inputString)).toEqual(td.expectedResult);
});