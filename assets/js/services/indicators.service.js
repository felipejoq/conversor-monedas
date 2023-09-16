import {formatDateStandardCL, formatDateToLocale} from "../helpers/formatters.helper.js";

const URL_SERVICE = 'https://mindicador.cl/api';

export const getIndicatorsFromApi = async (indicator = '') => {
    const finalURL = `${URL_SERVICE}/${indicator || ''}`;
    const response = await fetch(finalURL);

    if (!response.ok) {
        throw new Error(`Hubo un problema al obtener la información. Intente más tarde. Info: ${response.statusText}`)
    }
    return await response.json();
}

export const processingLocalData = async () => {
    try {
        const dataFromApi = await getIndicatorsFromApi();
        const indicatorsData = [];
        for (const key of Object.keys(dataFromApi)) {
            if (dataFromApi[key]["codigo"] && dataFromApi[key]["unidad_medida"] === 'Pesos') {
                const {serie} = await getIndicatorsFromApi(dataFromApi[key]["codigo"]);
                dataFromApi[key]["serie"] = serie.map(registry => {
                    return {
                        date: formatDateStandardCL(registry['fecha']),
                        value: registry['valor']
                    }
                });
                indicatorsData.push(dataFromApi[key]);
            }
        }

        const finalArrayData = indicatorsData.map(indicator => {
            return {
                code: indicator['codigo'],
                date: indicator['fecha'],
                name: indicator['nombre'],
                history_last_month: indicator['serie'],
                unit: indicator['unidad_medida'],
                current_value: indicator['valor']
            }
        });

        const timestamp = {
            create_at: formatDateStandardCL(new Date())
        }

        finalArrayData.push(timestamp);

        saveDataToLocalStorage(finalArrayData, 'indicators');

        return true;
    } catch (error) {
        throw error;
    }
}

export const getDataFromLocalStorage = (key = 'indicators') => {

    let data;
    try {
        data = JSON.parse(localStorage.getItem(key));
    } catch (e) {
        console.log(e);
    }

    return data || [];
}

export const getIndicatorByCode = (code = '') => {
    return getDataFromLocalStorage().find(indicator => indicator.code === code);
}

export const saveDataToLocalStorage = (data, key = 'indicators') => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const isOldOrCorruptedData = (dataFromLocalStorage = []) => {
    if (dataFromLocalStorage.length <= 0 || !dataFromLocalStorage[0].code || !dataFromLocalStorage) {
        return true;
    }
    const {create_at} = dataFromLocalStorage.find(element => element.create_at);
    const dateData = new Date().toLocaleDateString('es-CL', {
        timeZone: 'America/Santiago'
    });

    return create_at !== dateData;
}
