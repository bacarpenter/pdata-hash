function  main(): void
{
    let bcHash:number = personalDataHash('Ben', 'Carpener','12/31/2000', 12)
    let rmHash:number = personalDataHash('Rachel', 'Maddow', '4/1/1973', 413)

    console.log(checkHash(bcHash, 'Ben', 'Carpener','12/31/2000', 12))
    console.log(checkHash(rmHash, 'Rachel', 'Maddow', '4/1/1973', 413))
}

function personalDataHash(first:string, last:string, DOB:String, secretNumber:number): number
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
    
    return hash; 
}

function checkHash(hash:number, first:string, last:string, DOB:String, secretNumber:number): boolean
{
    return (personalDataHash(first, last, DOB, secretNumber) === hash)
}

main()