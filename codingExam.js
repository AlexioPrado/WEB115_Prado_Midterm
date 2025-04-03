


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
        let Principal = loanAmount;
        loanAmount = loanAmount - (loanAmount/100*(downPayment/100).toFixed(2));
        let monthlyPayment = (((0.0575 / 12) * loanAmount) / (1 - Math.pow(1 + (0.0575 / 12), (termYears * -12)))).toFixed(2)
        console.log(monthlyPayment)

        //Morgage term in years
        info.innerHTML = `<p>Mortgage Term: ${termYears} Years</p>`;
        //Morgage interest Rate
        info.innerHTML += `<p>Mortgage Interest Rate: 5.75%</p>`;
        //Monthly Payment
        info.innerHTML += `<p>Monthly Payment: $${monthlyPayment}</p>`
        //Principal Payment
        info.innerHTML += `<p>Principal Loan Amount: $${Principal}</p>`
        //Total interest amount (total interest = (monthlyPayment * termYears * 12 ) - loanAmount )
        info.innerHTML += `<p>Total Interest Amount: $${((monthlyPayment * termYears * 12) - loanAmount).toFixed(2)}</p>`;        
        //Total mortgage amount (total mortgage amount = loanAmount + totalInterest )
        info.innerHTML += `<p>Total Mortgage Amount: ${loanAmount + ((monthlyPayment * termYears * 12) - loanAmount)}</p>`
        //Display the monthly mortgage payments and the mortgage loan balance for each month.
        for (let i = 1; i <= termYears*12 ; i++){
            let month = document.createElement('p');
            month.innerHTML = `Month ${i}<br>`;
            month.innerHTML += `\tInterest: $${(loanAmount*(0.0575/12)).toFixed(2)}<br>`
            month.innerHTML += `\tPrincipal: $${(monthlyPayment - (loanAmount*(0.0575/12))).toFixed(2)}<br>`
            loanAmount = loanAmount - (monthlyPayment -(loanAmount*(0.0575/12))).toFixed(2)
            month.innerHTML += `Payment left: ${loanAmount.toFixed(2)}`;
            console.log(loanAmount)
            info.append(month)

        }
        //Monthly loan balance = total morgage amount - (monthly payment)
        info.innerHTML += `<p>Monthly Loan Balance: $${((loanAmount + ((monthlyPayment * termYears * 12) - loanAmount)) - monthlyPayment).toFixed(2)}</p>`
    }
};

