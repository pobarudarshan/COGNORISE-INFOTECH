const apiKey = '18591c430dc7e7bc242e1353';
const apiURL = 'https://api.exchangerate-api.com/v4/latest/USD'


document.addEventListener('DOMContentLoaded', () => {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency')
    const toCurrencySelect = document.getElementById('toCurrency')
    const convertButton = document.getElementById('convertButton')
    const resultDiv = document.getElementById('result')

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.textContent = currency;
                fromCurrencySelect.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.textContent = currency;
                toCurrencySelect.appendChild(option2);
            });

            fromCurrencySelect.value = 'INR';
            toCurrencySelect.value = 'USD';
        });

    convertButton.addEventListener('click', () => {
        const amount = amountInput.value;
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        if (amount === '' || isNaN(amount)) {
            resultDiv.textContent = 'Please enter a valid amount';
            return;
        }

        fetch(`${apiURL}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[toCurrency] / data.rates[fromCurrency];
                const convertedAmount = (amount * rate).toFixed(2);
                resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount}${toCurrency}`;
            })
            .catch(error => {
                resultDiv.textContent = "Error fatching exchange rates";
                console.error('error :- ', error);
            });
    })

})