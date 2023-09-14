import {getDataFromLocalStorage} from "../services/indicators.service.js";
import {currencySelect, historialTitle} from "../elements/html.js";

let newChart;

// Chart controller functions.
export const getDataToChart = async () => {
    let localData;
    try {
        localData = await getDataFromLocalStorage();
    } catch (e) {
        throw e;
    }
    const indicator = localData[currencySelect.value];

    indicator.history = indicator.history
        .sort((a, b) => a["fecha"].localeCompare(b["fecha"]))
        .slice(indicator.history.length - 10, indicator.history.length)

    const labels = indicator.history
        .map(value => {
            return new Date(value["fecha"]).toLocaleDateString('es-CL')
        });

    const data = indicator.history
        .map(value => {
            return value["valor"];
        });

    return {
        indicator: indicator.name,
        labels,
        data
    };
}

export const genChart = (canvasChart, chartDescription, chart = {}) => {
    if (newChart !== undefined){
        newChart.destroy();
    }
    historialTitle.style.display = 'block';
    chartDescription.innerHTML = `${chart.indicator}: Valores de los últimos 10 días.`;

    newChart = new Chart(canvasChart, {
        type: 'line',
        data: {
            labels: chart.labels,
            datasets: [{
                label: 'Valor del día',
                data: chart.data,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
