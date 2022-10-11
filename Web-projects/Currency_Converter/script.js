const currencyEl_from = document.getElementById('currency-from');
const amountEl_from = document.getElementById('amount-from');
const currencyEl_to = document.getElementById('currency-to');
const amountEl_to = document.getElementById('amount-to');

const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');

function calculate() {
  const currency_one = currencyEl_from.value;
  const currency_two = currencyEl_to.value;

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_to.value = (amountEl_from.value * rate).toFixed(2);
    });
}

currencyEl_from.addEventListener('change', calculate);
amountEl_from.addEventListener('input', calculate);
currencyEl_to.addEventListener('change', calculate);
amountEl_to.addEventListener('input', calculate);

swap.addEventListener('click', () => {
  const temp = currencyEl_from.value;
  currencyEl_from.value = currencyEl_to.value;
  currencyEl_to.value = temp;
  calculate();
});

calculate();