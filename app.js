// TARGETS
const billInput = document.getElementById("bill-input");
const peopleInput = document.getElementById("people-input");
const peopleError = document.getElementById("error-people");
const totalAmount = document.getElementById("total-per-person");
const totalTip = document.getElementById("tip-per-person");
const tipFive = document.getElementsByClassName("tip")[0];
const tipFifteen = document.getElementsByClassName("tip")[1];
const tipTwenty = document.getElementsByClassName("tip")[2];
const tipTwentyFive = document.getElementsByClassName("tip")[3];
const tipFifty = document.getElementsByClassName("tip")[4];
const tipCustom = document.getElementsByClassName("tip")[5];
const resetButton = document.getElementById("reset-button");
const peopleErrorMessage = "Can't be zero.";

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
    //TODO, need to reset the tip toggles too
    billInput.value = "";
    peopleInput.value = "";
    totalAmount.innerText = "$0.00";
    totalTip.innerText = "$0.00"
    disableReset();
    removePeopleError();
}

function detectReset() {
    if (billInput.value || peopleInput.value) {
        enableReset();
    }
}

// VALIDATION --------------------------------------------------------
function addPeopleError() {
    peopleError.innerText = peopleErrorMessage;
    peopleInput.classList.add("invalid");
}

function removePeopleError() {
    peopleError.innerText = "";
    peopleInput.classList.remove("invalid");
}

// UPDATE TOTALS  ----------------------------------------------------

function updateTotalPerPerson() {
    const numberPeople = getNumPeople();
    const billInputValue = billInput.value;
    var messages = [];

    // Validation base case: if number of ppl is empty or 0
    // TODO: negative case, non-number
    if (0) {//typeof(billInputValue) !== "number" || typeof(numberPeople) !== "number") {
        alert("invalid");
    }
    if (numberPeople === "0") {
        console.log("test");
        // don't calculate total
        addPeopleError();
        // } if (numberPeople == "") {
        //     return;
    } else {
        // TODO Check denominator first

        // In case error message is still showing
        removePeopleError();

        // Calculate Total Amount per Person
        if (numberPeople == "" || numberPeople == "0") {
            return;
        } else {
            let totalAmountValue = billInputValue / numberPeople;
            console.log("yes2");
            totalAmount.innerText = "$" + roundTotal(totalAmountValue);
            console.log("yes3");
        }
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
