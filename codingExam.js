/*

Include your name, email, and today's date at the top of the HTML page using paragraph tags.
Create a button with the id "Button1". Use an event listener that will activate the amortization calculator when the button is clicked.
When the button is clicked, it should:
- Prompt the user to enter the loan amount (without commas).
- Prompt the user to enter the downpayment as a percentage of the total loan amount. The Amortization calculator will then need to calculate the downpayment amount as a decimal $$$ amount proportional to the whole and subtract it from that whole. The remainder is the loan amount to be amortized.  
Prompt the user to enter the loan term in years (either 30 or 15).

Calculate and display the monthly payment at a fixed interest rate of 5.75%
To calculate the monthly payment, use the following formula or see the formula in the .docx:
monthly payment = (((interestRate / 12) * loanAmount) / (1 - Math.pow(1 + (interestRate / 12), (termYears * -12)))).toFixed(2); 

The calculated monthlyPayment will be the amount that needs to be paid each month to repay the loan over the given term with the fixed interest rate..

Print the following information:
Mortgage term in years
Mortgage interest rate
Mortgage amount (total loan amount = loanAmount + totalInterest)
Total interest amount (total interest = (monthlyPayment * termYears * 12 ) - loanAmount )
Total mortgage amount (total mortgage amount = loanAmount + totalInterest )
Display the monthly mortgage payments and the mortgage loan balance for each month.
Monthly loan balance = total morgage amount - (monthly payment)
If the balance reaches 0, print "This is the Ending Amortization Calculator..."
Where:

interestRate is the interest rate
loanAmount is the loan principal (loan amount)
termYears is the term in years
To calculate the total interest amount, use the formula: (monthlyPayment * termMonths) - loanAmount

To calculate the total loan amount, use the formula: loanAmount + totalInterest

To calculate the mortgage loan balance, use the formula: totalLoan - monthlyPayment

Use a loop (for loop, while loop, or do-while loop) to display the payment amounts and balances below the button.

Use an if statement to print "Ending..." when the balance reaches 0.

Use the .toFixed(2) method to round numbers to two decimal places.

Display the money results in USD formatting.

Additionally, alert the user if the loan term is not equal to 15 or 30 years.

*/
let button = document.getElementById('Button1');
let info = document.getElementById('Info');

button.onclick = function(){
    let input = true;
    while (input) {
        let loanAmount = prompt('Enter the loan amount:') // Only number, no other characters
        if (!isFinite(loanAmount)) {
            alert('Loan amount is not valid. Try again.')
            continue
        }

        let downPayment = prompt('Enter down payment as percentage:') // Percentage to Decimal
        if (!isFinite(downPayment)) {
            alert('Down payment is not valid. Try again.')
            continue
        }

        let termYears = Number(prompt('Enter loan term: (15/30) ')) // Has to be 15 or 30
        
        if (termYears !== 15 && termYears !== 30) {
            alert('Loan Term is not valid. Try again.')
            continue
        }

        input = false;
        calculate(loanAmount, downPayment, termYears);
    }

    function calculate(loanAmount, downPayment, termYears) {
        loanAmount = loanAmount - (loanAmount/100*5.75);
        let monthlyPayment = (((0.0575 / 12) * loanAmount) / (1 - Math.pow(1 + (0.0575 / 12), (termYears * -12)))).toFixed(2)
        console.log(monthlyPayment)

        //Morgage term in years
        info.innerHTML = `<p>Mortgage Term: ${termYears} Years</p>`;
        //Morgage interest Rate
        info.innerHTML += `<p>Mortgage Interest Rate: 5.75%</p>`;
        //Morgage Total (total loan amount = loanAmount + totalInterest)
        info.innerHTML += `<p>Mortgage Total: $${loanAmount + (loanAmount/100*0.0575).toFixed(2)}</p>`;
        //Total interest amount (total interest = (monthlyPayment * termYears * 12 ) - loanAmount )
        info.innerHTML += `<p>Total Interest Amount: $${((monthlyPayment * termYears * 12) - loanAmount).toFixed(2)}</p>`;        
        //Total mortgage amount (total mortgage amount = loanAmount + totalInterest )
        info.innerHTML += `<p>Total Mortgage Amount: ${loanAmount + ((monthlyPayment * termYears * 12) - loanAmount)}</p>`
        //Display the monthly mortgage payments and the mortgage loan balance for each month.
        for (let i = 1; i < termYears ; i++){
            let month = document.createElement('p');
            month.innerHTML = `Month ${i}<br>`;
            month.innerHTML += `\tInterest: $${(loanAmount*0.0575/12).toFixed(2)}<br>`
            month.innerHTML += `\tPrincipal: $${(monthlyPayment - (loanAmount*0.0575/12)).toFixed(2)}<br>`
            loanAmount = loanAmount - (loanAmount*0.0575/12).toFixed(2)
            month.innerHTML += `Payment left: ${loanAmount.toFixed(2)}`;
            console.log(loanAmount)
            info.append(month)

        }
        //Monthly loan balance = total morgage amount - (monthly payment)
        info.innerHTML += `<p>Monthly Loan Balance: $${((loanAmount + ((monthlyPayment * termYears * 12) - loanAmount)) - monthlyPayment).toFixed(2)}</p>`


    }
    
};

