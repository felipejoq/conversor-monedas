export const clpToCurrency = (amount, currencyCurrentValue) => {
    return parseFloat(amount) / parseFloat(currencyCurrentValue);
}

export const showResultToDOM = (divResult, amount, convertedResult, indicatorName, dateValue) => {
    divResult.innerHTML = `
                <p>Resultado: <strong>${amount} Peso Chilenos (CLP)</strong> equivalen a:</p>
                <p class="final-result"><strong>${convertedResult}</strong></p>
                <small>${indicatorName} hoy ${dateValue}.</small>
               `;
}

