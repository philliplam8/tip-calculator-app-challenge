// TARGETS
const billInput = document.getElementById("bill-input");
const peopleInput = document.getElementById("people-input");
const totalAmount = document.getElementById("total-per-person");
const totalTip = document.getElementById("tip-per-person");
const resetButton = document.getElementById("reset-button")

// CALCULATE TOTALS ----------------------------------------------
// returns the total tip based on the bill price
function calculateTip(bill, tip) {
    return bill * tip / 100;
}

//
function calculateTipPerPerson(tipTotal, people) {
    return tipTotal / people;
}

//
function calculateTotalPerPerson(bill, tip, people) {
    return bill * (1 + tipConverted) / people;
}

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
    if (regexPosition == -1 && existingAmount !== "") {
        billInput.value = existingAmount + ".00";
        totalAmount.innerHTML = existingAmount + ".00";
    }
}

function enableReset() {
    resetButton.removeAttribute("disabled");
}

function disableReset() {
    resetButton.setAttribute("disabled", true);
}

function runReset() {
    //TODO, need to reset the tip toggles too
    billInput.value = "";
    peopleInput.value = "";
    totalAmount.innerText = "$0.00";
    totalTip.innerText = "$0.00"
    disableReset();
}

function detectReset() {
    if (billInput.value || peopleInput.value) {
        enableReset();
    }
}

// VALIDATION --------------------------------------------------------
function isNumPeopleZero() {
    if (!getNumPeople()) {
        peopleInput.setAttribute("invalid", true);
    }
}

// UPDATE TOTALS  ----------------------------------------------------



function updateTotalPerPerson() {
    const numberPeople = getNumPeople();
    const billInputValue = billInput.value;

    // Validation base case: if number of ppl is empty or 0
    // TODO: negative case
    if (numberPeople == "" || numberPeople <= 0) {
        return;
    } else {
        // isNumPeopleZero();
        let totalAmountValue = billInputValue / numberPeople;
        totalAmount.innerText = "$" + roundTotal(totalAmountValue);
    }
}

function main() {
    detectReset();
    updateTotalPerPerson();
}

// Problem: 
// right now its not  adding the additional .00 from addDecimals()
billInput.addEventListener("input", main);
peopleInput.addEventListener("input", main);
resetButton.addEventListener("click", runReset);