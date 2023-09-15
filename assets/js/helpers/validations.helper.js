export const inputAmountValidation = (inputAmount) => {
    const value = parseFloat(inputAmount.value.trim());
    return !(!isNaN(value) || value >= 0);
}

export const selectCurrencyValidation = (selectCurrency) => {
    return !selectCurrency.value.trim();
}
