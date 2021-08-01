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

    // Add "clicked styling" to the current tip element clicked
    addTipsClickedStyle() {
        if (tipSection.pristine) {
            console.log("No tip element has been clicked.");
            return null;
        }

        else {
            this.element.classList.add("tip-clicked");
        }
    }

    // Remove "clicked styling" to the current tip element clicked
    removeTipsClickedStyle() {
        if (tipSection.pristine) {
            console.log("No tip element has been clicked.");
            return null;
        }
        else {
            this.element.classList.remove("tip-clicked");
        }
    }
}

// Usage
const tipSectionElement = document.getElementsByClassName("tips")[0];
let tipSection = new Tips(tipSectionElement);
let newTip;

tipSection.element.onclick = function (event) {
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