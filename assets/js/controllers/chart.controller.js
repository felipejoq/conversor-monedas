let newChart;

export const getDataToChart = (indicator = {}) => {
    let history = indicator.history_last_month
        .map(hist => {
            return {date: hist["fecha"], value: hist["valor"]}
        })
        .sort((a, b) => a["date"].localeCompare(b["date"]))
        .slice(indicator.history_last_month.length - 10, indicator.history_last_month.length);

    const dataFinal = {};

    history.forEach(item => {
        dataFinal[new Date(item.date).toLocaleDateString('es-CL')] = item.value;
    });

    return dataFinal;
}

export const genChart = (chartContainer, canvasChart, chartDescription, chartTitle, chartData = {}, indicatorName) => {

    if (newChart !== undefined) {
        newChart.destroy();
    }

    chartTitle.style.display = 'block';
    chartDescription.innerHTML = `${indicatorName}: Valores de los últimos 10 días.`;

    newChart = new Chart(canvasChart, {
        type: 'line',
        data: {
            labels: Object.keys(chartData),
            datasets: [{
                label: 'Valor del día',
                data: Object.values(chartData),
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
