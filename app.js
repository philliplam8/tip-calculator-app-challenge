// TARGETS
const billInput = document.getElementById("bill-input");
const peopleInput = document.getElementById("people-input");
const peopleError = document.getElementById("error-people");
const totalAmount = document.getElementById("total-per-person");
const totalTip = document.getElementById("tip-per-person");
const tipSectionElement = document.getElementsByClassName("tips")[0];
const resetButton = document.getElementById("reset-button");
const peopleErrorMessage = "Can't be zero.";

var userTipDecimal = 0;
var tipElementClicked;

class Tips {

    /* Items to keep track
    
    [x] isPristine?
    [x] SetPristine
    [x] RemovePristine

    [x] Which element is currently clicked
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

class Tip {

    /* Items to keep track 
       Click Style
       Apply style to  element currently clicked
       Remove style to element currently clicked
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

let tipSection = new Tips(tipSectionElement);
let newTip = new Tip(false, 0);

// CALCULATE TOTALS ----------------------------------------------
function roundTotal(total) {
    return Math.round(total * 100) / 100;
}

function getNumPeople() {
    return peopleInput.value;
}

// UPDATE INPUT ------------------------------------------------------

function addDecimals() {                                        // This function is called using onblur within the HTML
    const existingAmount = billInput.value;


    var regex = "\\.";                                          // Regex function Search will return position of match or -1 if no match 
    var regexPosition = existingAmount.search(regex);
    if (regexPosition == -1 && existingAmount !== "") {         // if no decimal, add decimal
        billInput.value = existingAmount + ".00";
        totalAmount.innerHTML = existingAmount + ".00";
    }
}

// RESET BUTTON ----------------------------------------------------
function enableReset() {
    resetButton.removeAttribute("disabled");
}

function disableReset() {
    resetButton.setAttribute("disabled", true);
}

function runReset() {
    //TODO add clear for custom tips

    // Clear Inputs
    billInput.value = "";
    peopleInput.value = "";

    // Clear Total Amounts
    totalAmount.innerText = "$0.00";
    totalTip.innerText = "$0.00"

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
    disableReset();
    removePeopleError();
}

function detectReset() {
    if (billInput.value || peopleInput.value || !tipSection.pristine) {
        console.log("Enabling reset...");
        enableReset();
    }
}

// VALIDATION --------------------------------------------------------
function enablePeopleError() {
    peopleError.innerText = peopleErrorMessage;
    peopleInput.classList.add("invalid");
}

function removePeopleError() {
    peopleError.innerText = "";
    peopleInput.classList.remove("invalid");
}

// UPDATE TOTALS  ----------------------------------------------------

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

// TIPS SECTION ----------------------------------------------------

// TODO handle case where no tip is clicked
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
    newTip.addTipsClickedStyle();

    // Parse data from input
    if (newTip.element.tagName == "INPUT") {
        console.log("Custom clicked");

        // If input field is non-empty, read current value before starting event listener
        if (newTip.element.value) {
            newTip.tipValue = parseFloat(newTip.element.value);
        }
        // Start event listener for input field
        newTip.element.addEventListener("input", function () {
            let tipString = newTip.element.value;
            newTip.tipValue = parseFloat(tipString);
            console.log("Input is " + newTip.tipValue);
            main();
        })
    }

    if (newTip.element.tagName == "BUTTON") {
        console.log("Tip Button clicked");
        let tipString = newTip.element.innerText;
        tipString = tipString.substring(0, tipString.length - 1);
        newTip.tipValue = parseFloat(tipString);
        console.log("Button is " + newTip.tipValue);
    }
}

function updateTotalPerPerson(bill, people, tip) {
    /* TODO
    Back space bill input
    backspace custom input
    backspace people input
    need ot update UI
    */ 

    console.log(bill, people, tip);
    let totalPerPersonValue;
    let tipPerPersonValue;


    // Calculate Total Amount per Person
    if (people == "" || people == "0") {
        return;
    }

    if (tip) {
        const tipDecimal = tip / 100;
        totalPerPersonValue = bill * (1 + tipDecimal) / people;
        tipPerPersonValue = bill * tipDecimal / people;

        // Update UI
        totalAmount.innerText = "$" + roundTotal(totalPerPersonValue);
        totalTip.innerText = "$" + roundTotal(tipPerPersonValue);
    }

    else {
        totalPerPersonValue = bill / people;
        totalAmount.innerText = "$" + roundTotal(totalPerPersonValue);
    }
}

function main() {
    const bill = getBill();
    const people = getPeople();

    if (!newTip.element) {
        newTip.tipValue = 0;
    }

    if (bill && people) {
        updateTotalPerPerson(bill, people, newTip.tipValue);
    }
    // Detect if Reset button should be enabled at the end
    detectReset();

}

// Problem: 
// right now its not  adding the additional .00 from addDecimals()
// if tip is entered first, it is not calculated
billInput.addEventListener("input", main);
peopleInput.addEventListener("input", main);
resetButton.addEventListener("click", runReset);
tipSection.element.onclick = function (event) {
    getTipEventHandler(event);
    main();
}
