"use strict";
function main() {
    var bcHash = personalDataHash('Ben', 'Carpener', '12/31/2000', 12);
    var rmHash = personalDataHash('Rachel', 'Maddow', '4/1/1973', 413);
    console.log(checkHash(bcHash, 'Ben', 'Carpener', '12/31/2000', 12));
    console.log(checkHash(rmHash, 'Rachel', 'Maddow', '4/1/1973', 413));
}
function personalDataHash(first, last, DOB, secretNumber) {
    var SECRET_KEY = 3589723852688877; //Generate your own 16 digit random number. This one is insecure!
    /**
     * Hashing Steps:
     *  1. Take number of letters in 1st name
     *  2. Multiply by char value of last letter of last name
     *  3. Take DOB and add it to the total. Year + Month * 10 + day * 100
     *  4. Add the server's secret number
     *  5. Multiply the whole thing by client's secretNumber / 100
     */
    var hash = 0;
    // Hashing
    hash += first.length * last.charCodeAt(last.length - 1);
    var splitDate = DOB.split("/");
    hash += parseInt(splitDate[0]) * 10;
    hash += parseInt(splitDate[1]) * 100;
    hash += parseInt(splitDate[2]);
    hash += SECRET_KEY;
    hash = hash * (secretNumber / 100);
    hash = Math.round(hash);
    return hash;
}
function checkHash(hash, first, last, DOB, secretNumber) {
    return (personalDataHash(first, last, DOB, secretNumber) === hash);
}
main();
