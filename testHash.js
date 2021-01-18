"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var hashServer_1 = require("./hashServer");
var readline_1 = __importDefault(require("readline"));
var rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
function main() {
    var hash;
    var newHash;
    var varifiaction;
    /* Test the hash from user inputs */
    rl.question("What would you like to do?\n[0] Create new appointment varifiaction\n[1] Varify appointment\nSelection: ", function (selection) {
        if (parseInt(selection) == 0) {
            newHash = true;
            rl.question("First name? ", function (fName) {
                rl.question("Last name? ", function (lName) {
                    rl.question("DOB (Format: MM/DD/YYYY) ", function (DOB) {
                        rl.question("Secret Number (Not 0. Must be whole number) ", function (sNum) {
                            sNum = parseInt(sNum);
                            hash = hashServer_1.personalDataHash(fName, lName, DOB, sNum);
                            rl.close();
                        });
                    });
                });
            });
        }
        else {
            newHash = false;
            rl.question("First name? ", function (fName) {
                rl.question("Last name? ", function (lName) {
                    rl.question("DOB (Format: MM/DD/YYYY) ", function (DOB) {
                        rl.question("Secret Number (Not 0. Must be whole number) ", function (sNum) {
                            sNum = parseInt(sNum);
                            hash = hashServer_1.personalDataHash(fName, lName, DOB, sNum);
                            rl.question("Code: ", function (code) {
                                if (hashServer_1.checkHash(code, fName, lName, DOB, sNum)) {
                                    varifiaction = true;
                                }
                                else {
                                    varifiaction = false;
                                }
                                rl.close();
                            });
                        });
                    });
                });
            });
        }
    });
    rl.on("close", function () {
        if (hash) //If hash exsits
         {
            if (newHash) {
                console.log("Your varification code is: " + hash + ". Please write it down, as it will be used to validate your \nidentity at the time of your appointment.");
            }
            else {
                if (varifiaction) {
                    console.log("That matches our records.");
                }
                else {
                    console.log("varifiaction has failed.");
                }
            }
        }
        else {
            console.log("\nGood bye.");
        }
    });
}
main();
