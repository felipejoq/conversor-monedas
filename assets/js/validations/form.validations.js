// Validations functions.
import {getDataFromLocalStorage, saveDataLocalStorage} from "../services/indicators.service.js";
import {amountErrorMessage, currencyErrorMessage} from "../elements/html.js";

export const isOldData = async () => {
    let localData = await getDataFromLocalStorage();
    if (localData.length <= 0) {
        await saveDataLocalStorage();
        localData = getDataFromLocalStorage();
    }
    const {info} = localData.find(data => data.info);
    const dateToday = new Date().toLocaleDateString('es-CL');

    return localData.length <= 0 || info['date'] !== dateToday;
}

export const showErrors = (type, message) => {
    if (type === 'erase') {
        amountErrorMessage.innerHTML = '';
        currencyErrorMessage.innerHTML = '';
    }
    if (type === 'amount') {
        amountErrorMessage.innerHTML = message;
    } else if (type === 'currency') {
        currencyErrorMessage.innerHTML = message;
    }
}

export const validateForm = (indexIndicator, valueInput) => {
    if (isNaN(valueInput)) {
        showErrors('amount', 'Debe ingresar sólo números.');
        return true;
    }
    showErrors('erase');

    if (!valueInput || valueInput <= 0) {
        showErrors('amount', 'Ingrese un monto de dinero en Pesos Chilenos (CLP).');
        return true;
    }
    showErrors('erase');

    if (!indexIndicator) {
        showErrors('currency', 'Debe seleccionar una moneda a convertir.');
        return true;
    }
    showErrors('erase');
    return false;
}
