export function personalDataHash(first:string, last:string, DOB:String, secretNumber:number): string
{
    const SECRET_KEY = 3589723852688877 //Generate your own 16 digit random number. This one is insecure!
    
    /**
     * Hashing Steps:
     *  1. Take number of letters in 1st name
     *  2. Multiply by char value of last letter of last name
     *  3. Take DOB and add it to the total. Year + Month * 10 + day * 100
     *  4. Add the server's secret number  
     *  5. Multiply the whole thing by client's secretNumber / 100
     */

    let hash:number = 0;

    // Hashing
    hash += first.length * last.charCodeAt(last.length - 1)

    let splitDate:string[] = DOB.split("/")
    hash += parseInt(splitDate[0]) * 10
    hash += parseInt(splitDate[1]) * 100
    hash += parseInt(splitDate[2])

    hash += SECRET_KEY

    hash = hash * (secretNumber/100);
    hash = Math.round(hash)
    
    // Format the hash!
    let splitHash:string[] = hash.toString().split("")
    let formatedHash:string = ""
    let i = 1
    splitHash.forEach(element => {
        if (i % 3 === 0)
        {
            formatedHash += "-"
        }
        formatedHash += element
        i += 1
    });
    return formatedHash; 
}

export function checkHash(hash:string, first:string, last:string, DOB:String, secretNumber:number): boolean
{
    return (personalDataHash(first, last, DOB, secretNumber) === hash)
}