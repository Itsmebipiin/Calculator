let input = document.getElementById('inputBox');
let button = document.querySelectorAll('button');

let string = "";
let arr = Array.from(button);

arr.forEach(button => {

    button.addEventListener('click', (e) => {

        let value = e.target.innerHTML;

        if (value == '=') {

            try {

                let expression = string;

                // for percentage
                expression = expression.replace(/×/g, '*');
                const match = expression.match(
                    /(\d+\.?\d*)\s*([+\-*/])\s*(\d+\.?\d*)%$/
                );

                if (match) {

                    const firstNumber = parseFloat(match[1]);
                    const operator = match[2];
                    const secondNumber = parseFloat(match[3]);

                    let percentageValue;

                    if (operator === '+' || operator === '-') {

                        percentageValue =
                            (firstNumber * secondNumber) / 100;

                    }

                    else {

                        percentageValue =
                            secondNumber / 100;
                    }

                    expression =
                        firstNumber +
                        operator +
                        percentageValue;
                }

                else if (expression.endsWith('%')) {

                    const number =
                        parseFloat(expression.slice(0, -1));

                    expression =
                        (number / 100).toString();
                }

                string = eval(expression);

                input.value = string;

            }

            catch (error) {

                input.value = "Error";
                string = "";
            }
        }

        else if (value == 'AC') {

            string = "";
            input.value = string;

        }

        else if (value == 'DEL') {

            string =
                string.substring(0, string.length - 1);

            input.value = string;

        }

        else if (value == '%') {

            if (string !== "" && !string.endsWith('%')) {

                string += "%";
                input.value = string;

            }
        }

        else {

            string += value;
            input.value = string;

        }

    });

});