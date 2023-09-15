import {inputAmountValidation, selectCurrencyValidation} from "../helpers/validations.helper.js";
import {
    amountErrorMessage,
    amountInput, canvasChart, chartDescription,
    currencyErrorMessage,
    currencySelect, historialTitle, showChart,
    showResult
} from "../components/html.components.js";
import {hiddenErrors, showError} from "../helpers/errors.helper.js";
import {clpToCurrency, showResultToDOM} from "./converter.controller.js";
import {getIndicatorByCode} from "../services/indicators.service.js";
import {formatDateToLocale, formatNumberToLocale} from "../helpers/formatters.helper.js";
import {genChart, getDataToChart} from "./chart.controller.js";
import {bootApp} from "../boot.app.js";

export const triggerConverter = () => {
    if (inputAmountValidation(amountInput)) {
        showError(amountErrorMessage, 'Ingrese solo montos mayores a 0 en Pesos Chilenos (CLP)');
        return;
    } else if (selectCurrencyValidation(currencySelect)) {
        hiddenErrors([amountErrorMessage]);
        showError(currencyErrorMessage, 'Seleccione una moneda a convertir.');
        return;
    } else {
        hiddenErrors([amountErrorMessage, currencyErrorMessage]);
    }

    try {
        const currencyCurrentValue = getIndicatorByCode(currencySelect.value).current_value;
        const amount = amountInput.value;

        const resultConvert = clpToCurrency(amount, currencyCurrentValue);
        const indicator = getIndicatorByCode(currencySelect.value);
        const date = formatDateToLocale(indicator.date);

        const amountFormat = formatNumberToLocale(amountInput.value);

        showResultToDOM(showResult, amountFormat, resultConvert, indicator.name, date);
        const dataChart = getDataToChart(indicator);
        genChart(showChart, canvasChart, chartDescription, historialTitle, dataChart, indicator.name);
    } catch (e) {
        bootApp();
    }

}
