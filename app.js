// CONSTANTS
const PEOPLE_ERROR_MESSAGE = "Can't be zero.";
const NEGATIVE_ERROR_MESSAGE = "Can't be negative."
const INVALID_ERROR_MESSAGE = "Invalid entry. Must be a number."
const REQUIRED_MESSAGE = "This field is required."
const ZERO_DOLLARS = "$0.00";

// VARIABLES
var userTipDecimal = 0;
var tipElementClicked;

// TARGETS
const billInput = document.getElementById("bill-input");
const peopleInput = document.getElementById("people-input");
const customTipInput  = document.getElementById("custom");
const peopleError = document.getElementById("error-people");
const totalAmount = document.getElementById("total-per-person");
const totalTip = document.getElementById("tip-per-person");
const tipSectionElement = document.getElementsByClassName("tips")[0];
const resetButton = document.getElementById("reset-button");

// CLASSES --------------------------------------------------------------------


/**
 * Tips represents the overall Tips section and handles identifying the current 
 * tip selected by the user and whether the tips section has been modified by
 * the user. 
 */
class Tips {
    /**
     * 
     * @param {object} element Returns the Tips Section DOM element 
     * @param {boolean} [pristine=true] Optional boolean value determines if the
     * Tips section has never been modified and defaults to true.
     */
    constructor(element) {
        this.element = element;
        this.pristine = true;
    }

    addTipsPristine() {
        this.pristine = true;
    }

    removeTipsPristine() {
        this.pristine = false;
    }

    // Return the current tip element clicked
    elementClicked() {
        if (this.pristine) {
            console.log("No tip element has been clicked.");
            return null;
        }

        else {
            return document.querySelector(".tip-clicked");
        }
    }
}

/**
 * Tip represents the individual tip that is currently selected by the user
 * and handles updating the styling on clicked and non-clicked tip elements 
 */
class Tip {
    /**
     * 
     * @param {object} element Returns the Tip DOM elemennt clicked by the user.
     * @param {number} tipValue Float value of the tip clicked as a percent. For 
     * example 5% would have the value of 5.
     */
    constructor(element, tipValue) {
        this.element = element;
        this.tipValue = tipValue;
    }

    removeTipValue() {
        this.element = false;
        this.tipValue = 0;
    }

    // Add "clicked styling" to the current tip element clicked
    addTipsClickedStyle() {
        if (tipSection.pristine) {
            console.log("No tip element has been clicked.");
        }

        else {
            this.element.classList.add("tip-clicked");
        }
    }

    // Remove "clicked styling" to the current tip element clicked
    removeTipsClickedStyle() {
        if (tipSection.pristine) {
            console.log("No tip element has been clicked.");
        }
        else {
            this.element.classList.remove("tip-clicked");
        }
    }
}

// Initialize Tips and Tip class instance
let tipSection = new Tips(tipSectionElement);
let newTip = new Tip(false, 0);

// CALCULATE TOTALS -----------------------------------------------------------
function roundTotal(total) {
    return Math.round(total * 100) / 100;
}

function getNumPeople() {
    return peopleInput.value;
}

// UPDATE INPUT ---------------------------------------------------------------

function decimalsRegex(numberString) {
    const stringLength = numberString.length;
    var newNumberString;

    // Regex function Search will return position of match or -1 if no match 
    var regex = "\\.";
    var regexPosition = numberString.search(regex);

    // if no decimal & non-empty, add decimal
    if (regexPosition == -1 && numberString !== "") {
        newNumberString = numberString + ".00";
    }

    // if decimal exists, but no digits
    else if (regexPosition == stringLength - 1) {
        newNumberString = numberString + "00";
    }

    // if decimal exists, but only 1 digit
    else if (regexPosition == stringLength - 2) {
        newNumberString = numberString + "0";
    }

    // decimal exists and has 2 or more digits
    // TODO should we trim if there are more  digits?
    else {
        newNumberString = numberString;
    }

    return newNumberString;
}

// need to update 3 things
// 1. Bill Input field
// 2. Read only Tip Amount / Person value
// 3. read only Total / Person value

function addZeroes() {
    const existingBillInput = billInput.value;
    const existingTipAmount = totalTip.innerHTML;
    const existingTotalAmount = totalAmount.innerHTML;

    billInput.value = decimalsRegex(existingBillInput);
    totalTip.innerHTML = decimalsRegex(existingTipAmount);
    totalAmount.innerHTML = decimalsRegex(existingTotalAmount);
}

// RESET BUTTON ---------------------------------------------------------------
function enableReset() {
    resetButton.removeAttribute("disabled");
}

function disableReset() {
    resetButton.setAttribute("disabled", true);
}

function runReset() {
    //TODO add clear for custom tips

    // Clear Inputs
    const numberOfInputs = document.getElementsByTagName("input").length;
    for (let i = 0; i < numberOfInputs; i++) {
        document.getElementsByTagName("input")[i].value = ""
    }

    // Clear Total Amounts
    totalAmount.innerText = ZERO_DOLLARS;
    totalTip.innerText = ZERO_DOLLARS;

    // Clear Tips, but first check if tips is dirty
    if (!tipSection.pristine) {

        // Check if custom tip
        if (newTip.element.tagName == "INPUT") {
            newTip.element.value = "";
        }
        newTip.removeTipsClickedStyle();
        newTip.removeTipValue()
        tipSection.addTipsPristine();
    }

    // Clear validation errors
    removePeopleError();

    // Reset finished, update reset button UI
    disableReset();
}

function detectReset() {
    if (billInput.value || peopleInput.value || !tipSection.pristine) {
        console.log("Enabling reset...");
        enableReset();
    }
}

// VALIDATION -----------------------------------------------------------------
function enablePeopleError() {
    peopleError.innerText = PEOPLE_ERROR_MESSAGE;
    peopleInput.classList.add("invalid");
}

function removePeopleError() {
    peopleError.innerText = "";
    peopleInput.classList.remove("invalid");
}

// UPDATE TOTALS  -------------------------------------------------------------

function getBill() {
    console.log("getBill Ok");
    return billInput.value;
}

function getPeople() {
    const numberPeople = getNumPeople();

    // Validation base case: if number of ppl is empty or 0
    // TODO: validation for negative case, non-number
    if (0) {//typeof(billInputValue) !== "number" || typeof(numberPeople) !== "number") {
        alert("invalid");
    }
    if (numberPeople === "0") {
        // don't calculate total
        enablePeopleError();

    } else {
        // In case error message is still showing
        removePeopleError();
        return numberPeople;
    }
}

// TIPS SECTION ---------------------------------------------------------------


// TODO 
// handle case where no tip is clicked
// BUG: is trying to parse when clicking on H2 or DIV backgroundn

function getTipEventHandler(event) {
    console.log(
        "event.target: ", event.target, "\n",
        "event.currentTarget: ", event.currentTarget, "\n",
        "event.target.tagName: ", event.target.tagName);

    const oldTip = newTip;
    newTip = new Tip(event.target);
    console.log(newTip.element);

    // Apply styling
    if (tipSection.pristine) {
        // Tips section has never been edited, but will now be edited
        tipSection.removeTipsPristine();
        //detectReset();
    } else {
        // Clear style on previously clicked Tip Button
        oldTip.removeTipsClickedStyle();
    }


    // Parse data from input
    if (newTip.element.tagName == "INPUT") {
        console.log("Custom clicked");
        newTip.addTipsClickedStyle();


        if (newTip.element.value == "0" || newTip.element.value == "") {
            newTip.tipValue = 0;
        }

        // If input field is non-empty, read current value before starting event listener
        if (newTip.element.value) {
            newTip.tipValue = parseFloat(newTip.element.value);
        }
        // Start event listener for input field
        newTip.element.addEventListener("input", function () {

            if (newTip.element.value == "0" || newTip.element.value == "") {
                newTip.tipValue = 0;
            }

            else {
                let tipString = newTip.element.value;
                newTip.tipValue = parseFloat(tipString);
            }


            console.log("Input is " + newTip.tipValue);
            main();
        })
    }

    if (newTip.element.tagName == "BUTTON") {
        console.log("Tip Button clicked");
        newTip.addTipsClickedStyle();
        let tipString = newTip.element.innerText;
        tipString = tipString.substring(0, tipString.length - 1);
        newTip.tipValue = parseFloat(tipString);
        console.log("Button is " + newTip.tipValue);
    }
}

function updateTotalPerPerson(bill, people) {
    /* TODO
    Back space bill input
    backspace custom input
    backspace people input
    need ot update UI
    */

    console.log(bill, people);
    let totalPerPersonValue;
    let tipPerPersonValue;


    // Calculate Total Amount per Person
    if (people == "" || people == "0") {
        return;
    }

    if (newTip.tipValue == "") {
        newTip.tipValue = 0;
    }

    if (newTip.tipValue >= 0) {
        const tipDecimal = newTip.tipValue / 100;
        totalPerPersonValue = bill * (1 + tipDecimal) / people;
        tipPerPersonValue = bill * tipDecimal / people;

        // Update UI
        totalTip.innerText = "$" + roundTotal(tipPerPersonValue);
        totalAmount.innerText = "$" + roundTotal(totalPerPersonValue);
    }
}

function main() {
    let bill = getBill();
    const people = getPeople();

    if (!newTip.element) {
        newTip.tipValue = 0;
    }

    if (bill == "0" || bill == "") {
        bill = 0;
        updateTotalPerPerson(bill, people);
    }

    if (people == "0") {
        // TODO this field is required error message
        enablePeopleError();
    }

    if (bill && people) {
        updateTotalPerPerson(bill, people);
    }
    // Detect if Reset button should be enabled at the end
    detectReset();

}

// EVENT LISTENERS ------------------------------------------------------------
billInput.addEventListener("blur", addZeroes);
billInput.addEventListener("input", main);

peopleInput.addEventListener("input", main);
peopleInput.addEventListener("blur", addZeroes);

resetButton.addEventListener("click", runReset);

tipSection.element.onclick = function (event) {
    getTipEventHandler(event);
    main();
    addZeroes();
}
customTipInput.addEventListener("blur", addZeroes);