import { personalDataHash, checkHash } from "./hashServer";
import readline from "readline";
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function main(): void {
    let hash: string;
    let newHash: boolean;
    let varifiaction: boolean;
    /* Test the hash from user inputs */
    rl.question("What would you like to do?\n[0] Create new appointment varifiaction\n[1] Varify appointment\nSelection: ", function (selection: string) {
        if (parseInt(selection) == 0) {
            newHash = true;
            rl.question("First name? ", function (fName: string) {
                rl.question("Last name? ", function (lName: string) {
                    rl.question("DOB (Format: MM/DD/YYYY) ", function (DOB: string) {
                        rl.question("Secret Number (Not 0. Must be whole number) ", function (sNum: any) {
                            sNum = parseInt(sNum)
                            hash = personalDataHash(fName, lName, DOB, sNum)
                            rl.close()
                        })
                    })
                })
            })
        }
        else {
            newHash = false
            rl.question("First name? ", function (fName: string) {
                rl.question("Last name? ", function (lName: string) {
                    rl.question("DOB (Format: MM/DD/YYYY) ", function (DOB: string) {
                        rl.question("Secret Number (Not 0. Must be whole number) ", function (sNum: any) {
                            sNum = parseInt(sNum)
                            hash = personalDataHash(fName, lName, DOB, sNum)
                            rl.question("Code: ", function (code: string) {
                                if (checkHash(code, fName, lName, DOB, sNum)) {
                                    varifiaction = true
                                }
                                else {
                                    varifiaction = false
                                }
                                rl.close()
                            })

                        })
                    })
                })
            })
        }
    })
    rl.on("close", function (): void {
        if (hash) //If hash exsits
        {
            if (newHash) {
                console.log(`Your varification code is: ${hash}. Please write it down, as it will be used to validate your \nidentity at the time of your appointment.`)
            }
            else {
                if (varifiaction) {
                    console.log("That matches our records.")
                }
                else {
                    console.log("Varifiaction has failed. These records do not match the varification code.")
                }
            }
        }
        else {
            console.log("\nGood bye.")
        }
    })
}

main()