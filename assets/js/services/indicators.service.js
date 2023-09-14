import {containerLoading} from "../elements/html.js";

const URL_INDICATORS = 'https://mindicador.cl/api';

// Services functions.
export const getEconomicsIndicators = async (indicator = '') => {
    const source = `${URL_INDICATORS}/${indicator}`;

    try {
        const result = await fetch(source, {
            method: 'GET'
        });

        if (!result.ok) {
            throw new Error(`Ocurrió un problema. Intente nuevamente más tarde. Info: ${result.statusText}`)
        }

        return await result.json();
    } catch (e) {
        throw e;
    }
}

export const saveDataLocalStorage = async () => {
    let indicators = [];
    containerLoading.style.display = 'flex';
    let indicatorsFetch;

    try {
        indicatorsFetch = await getEconomicsIndicators();
    } catch (e) {
        throw e
    }

    containerLoading.style.display = 'none';

    for (const key of Object.keys(indicatorsFetch)) {
        if (typeof indicatorsFetch[key] === 'object') {
            const {codigo} = indicatorsFetch[key];
            let {serie} = await getEconomicsIndicators(codigo);
            indicatorsFetch[key].serie = serie;
            indicators.push(indicatorsFetch[key]);
        }
    }

    indicators = indicators.map(({codigo, fecha, nombre, serie, unidad_medida, valor}) => {
        if (unidad_medida !== 'Porcentaje') {
            return {
                code: codigo,
                name: nombre,
                unit_measured: unidad_medida,
                date: fecha,
                value: valor,
                history: serie
            }
        }
    }).filter(indicator =>  typeof indicator === 'object' && indicator.unit_measured === 'Pesos')

    indicators.push({
        info: {
            date: new Date().toLocaleDateString('es-CL'),
            now: Date.now()
        }
    });

    localStorage.setItem('indicators', JSON.stringify(indicators));
}

export const getDataFromLocalStorage = async () => {
    let indicators = JSON.parse(localStorage.getItem('indicators')) || [];

    if (indicators.length <= 0) {
        try {
            await saveDataLocalStorage();
        } catch (e) {
            throw e;
        }
        indicators = JSON.parse(localStorage.getItem('indicators')) || [];
    }

    return indicators;
}
