export const clpToCurrency = (amount, currencyCurrentValue) => {
    return (parseFloat(amount) / parseFloat(currencyCurrentValue)).toFixed(5);
}

export const showResultToDOM = (divResult, amount, convertedResult, indicatorName, dateValue) => {
    divResult.innerHTML = `
                <p>Resultado: <strong>${amount} Peso Chilenos (CLP)</strong> equivalen a:</p>
                <p class="final-result"><strong>${convertedResult}</strong></p>
                <small>${indicatorName} hoy ${dateValue}.</small>
               `;
}
