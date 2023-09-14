// Convert controller functions.
import {validateForm} from "../validations/form.validations.js";
import {getDataFromLocalStorage} from "../services/indicators.service.js";
import {canvasChart, chartDescription, historialTitle, result} from "../elements/html.js";
import {genChart, getDataToChart} from "./chart.controller.js";

let CLPFormat = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 10
});

export const getConvertResult = async (amountInput, currencySelect) => {
    const indexIndicator = currencySelect.value;
    const valueInput = parseFloat(amountInput.value);

    if (validateForm(indexIndicator, valueInput)) {
        return;
    }

    let data;
    try {
        data = await getDataFromLocalStorage();
    } catch (e) {
        throw e;
    }

    showResult(data, indexIndicator, valueInput);

    const chart = await getDataToChart();

    genChart(canvasChart, chartDescription, chart);
}

const showResult = (data, indexIndicator, valueInput) => {
    const indicator = data[indexIndicator];
    const converted = (parseFloat(valueInput) / parseFloat(indicator.value)).toFixed(5);

    const finalResult = CLPFormat.format(parseFloat(converted));
    const inputFormatted = CLPFormat.format(valueInput);
    const dateInfo = new Date(indicator.date)
        .toLocaleDateString("es-CL", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
            timeZone: 'America/Santiago'
        });

    result.innerHTML = `
                <p>Resultado: <strong>${inputFormatted} Peso Chilenos (CLP)</strong> equivalen a:</p>
                <p class="final-result"><strong>${finalResult}</strong></p>
                <small>${indicator.name} hoy ${dateInfo}.</small>
               `;
}