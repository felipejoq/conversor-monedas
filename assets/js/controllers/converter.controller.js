// Convert controller functions.
import {validateForm} from "../validations/form.validations.js";
import {getDataFromLocalStorage} from "../services/indicators.service.js";
import {canvasChart, chartDescription, historialTitle, result} from "../elements/html.js";
import {genChart, getDataToChart} from "./chart.controller.js";

export const getConvertResult = async (amountInput, currencySelect) => {
    const indexIndicator = currencySelect.value;
    const valueInput = Number(amountInput.value);

    if (validateForm(indexIndicator, valueInput)) {
        return;
    }

    let data;
    try {
         data = await getDataFromLocalStorage();
    }catch (e) {
        throw e;
    }
    const indicator = data[indexIndicator];
    const converted = (valueInput / indicator.value).toFixed(5);

    result.innerHTML = `<p>Resultado: <strong>${valueInput} Peso Chilenos (CLP)</strong> equivalen a:</p><p class="final-result"><strong>${converted}</strong></p><p>${indicator.name}</p>`;

    const chart = await getDataToChart();

    genChart(canvasChart, chartDescription, chart);
}