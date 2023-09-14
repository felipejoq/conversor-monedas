import {getDataFromLocalStorage, isOldData, processingLocalData} from "./services/indicators.service.js";
import {fillSelect, loadingControl} from "./controllers/elements.controller.js";
import {containerLoading, currencySelect, infoErrorGetData} from "./components/html.components.js";
import {showFatalError} from "./helpers/errors.helper.js";

export const bootApp = () => {
    let renewData = isOldData(getDataFromLocalStorage());
    if (renewData) {
        loadingControl(containerLoading, 'show');
        processingLocalData()
            .then(resolve => {
                if (resolve) {
                    fillSelect(getDataFromLocalStorage('indicators'), currencySelect);
                    loadingControl(containerLoading, 'hidden');
                }
            })
            .catch(error => {
                loadingControl(containerLoading, 'hidden');
                showFatalError(infoErrorGetData, error)
            })
    } else {
        fillSelect(getDataFromLocalStorage('indicators'), currencySelect);
        loadingControl(containerLoading, 'hidden');
        console.log('No hay que renovar', renewData)
    }
}