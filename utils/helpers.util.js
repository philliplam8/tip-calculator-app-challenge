'use strict';

export function roundTotal(total) {
    return Math.round(total * 100) / 100;
}

export function decimalsRegex(numberString) {
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
    // TODO should we trim if there are more digits?
    else {
        newNumberString = numberString;
    }

    return newNumberString;
}