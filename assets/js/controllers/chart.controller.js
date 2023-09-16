let newChart;

export const getDataToChart = (indicator = {}) => {
    let history = indicator.history_last_month
        .slice(0, 10)
        .reverse();

    const finalData = {};
    history.forEach(data => finalData[data.date] = data.value);

    return finalData;
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
                label: 'Valor',
                data: Object.values(chartData),
                borderWidth: 1,

            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function (context, value) {
                            let label = context.dataset.label || '';

                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('es-CL', {
                                    style: 'currency',
                                    currency: 'CLP'
                                }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                },
                title: {
                    display: true,
                    text: `${indicatorName}`
                },
                subtitle: {
                    display: true,
                    text: `Últimos 10 registros`
                }
            },
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function (value) {
                            return new Intl.NumberFormat('es-CL', {
                                style: 'currency',
                                currency: 'CLP'
                            }).format(value);
                        }
                    }
                }
            }
        }
    });

}
