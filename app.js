// TARGETS
const billInput = document.getElementById("bill-input");
const peopleInput = document.getElementById("people-input");
const peopleError = document.getElementById("error-people");
const totalAmount = document.getElementById("total-per-person");
const totalTip = document.getElementById("tip-per-person");
const tipSection = document.getElementsByClassName("tips")[0];
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

function getTipEventHandler(event) {
    console.log(event.target, event.target.tagName);

    if (event.target.tagName == "INPUT") {
        // Do something
    }
    else if (event.target.tagName == "H2") {
        var tipElement = event.target.innerText;
        var tipString = tipElement.substring(0, tipElement.length - 1);
        var tip = parseFloat(tipString) / 100;
        console.log(tipElement, tipString, tip);
        return tip;
    }
}

function updateTotalPerPerson(bill, people, tip) {
    console.log(bill, people, tip);
    // Calculate Total Amount per Person
    if (people == "" || people == "0") {
        return;
    } if (tip) {
        console.log("tip");
        let totalAmountValue = bill * (1 + tip) / people;
        totalAmount.innerText = "$" + roundTotal(totalAmountValue);
    }
    else {
        let totalAmountValue = bill / people;
        totalAmount.innerText = "$" + roundTotal(totalAmountValue);
    }
}

function main() {
    const bill = getBill();
    const people = getPeople();
    const tip = getTipEventHandler(event);

    if (bill && people) {
        // Check for tip

        // Then calculate total
        updateTotalPerPerson(bill, people, tip);
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

tipSection.onclick = function (event) {  
    const bill = getBill();
    const people = getPeople();
    const tip = getTipEventHandler(event);
    updateTotalPerPerson(bill, people, tip);
}
