// TARGETS
const billInput = document.getElementById("bill-input");
const peopleInput = document.getElementById("people-input");
const peopleError = document.getElementById("error-people");
const totalAmount = document.getElementById("total-per-person");
const totalTip = document.getElementById("tip-per-person");
const tipSection = document.getElementsByClassName("tips")[0];
const resetButton = document.getElementById("reset-button");
const peopleErrorMessage = "Can't be zero.";

var userTip = 0;
var tipElementClicked;

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

// TIPS SECTION ----------------------------------------------------
function isTipsPristine() {
    return tipSection.hasAttribute("tips-pristine");
}

function addTipsPristine() {
    tipSection.setAttribute("tips-pristine", true);
}

function removeTipsPristine() {
    tipSection.removeAttribute("tips-pristine");
}

function addTipsClickedStyle(element) {
    element.classList.add("tip-clicked");
}

function removeTipsClickedStyle(element) {
    element.classList.remove("tip-clicked");
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
    if (!isTipsPristine()) {
        removeTipsClickedStyle(tipElementClicked);
        addTipsPristine();
    }

    disableReset();
    removePeopleError();
}

function detectReset() {
    if (billInput.value || peopleInput.value || !isTipsPristine()) {
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

// TODO handle case where no tip is clicked
function getTipEventHandler(event) {
    console.log(
        "event.target: ", event.target, "\n",
        "event.currentTarget: ", event.currentTarget, "\n",
        "event.target.tagName: ", event.target.tagName);

    var newTipElement;

    if (event.target.tagName == "INPUT") {
        // TODO something
    }
    if (event.target.tagName == "BUTTON") {
        newTipElement = event.target;
        // console.log(isTipsPristine(event));
        if (isTipsPristine()) {
            // Tips section has never been edited, but will now be edited
            removeTipsPristine();
            detectReset();
        } else {
            // Clear style on previously clicked Tip Button
            removeTipsClickedStyle(tipElementClicked);
        }
        addTipsClickedStyle(newTipElement);
        tipElementClicked = newTipElement;
    }

    // // Parse new tip clicked
    var tipString = tipElementClicked.innerText.substring(0, tipElementClicked.innerText.length - 1);
    console.log(tipString);
    userTipDecimal = parseFloat(tipString) / 100;
    return userTipDecimal;
}

function updateTotalPerPerson(bill, people, tip) {
    console.log(bill, people, tip);
    let totalPerPersonValue;
    let tipPerPersonValue;


    // Calculate Total Amount per Person
    if (people == "" || people == "0") {
        return;
    }

    if (tip) {
        console.log("tip");
        totalPerPersonValue = bill * (1 + tip) / people;
        tipPerPersonValue = bill * tip / people;

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
    let tip = 0;

    if (tipElementClicked) {
        // TODO??? there is no event being passed
        tip = getTipEventHandler(event);
    }

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
    // TODO -- this is duplicated for the sake of making it work, will need to refactor  
    const bill = getBill();
    const people = getPeople();
    const tip = getTipEventHandler(event);
    updateTotalPerPerson(bill, people, tip);
}
