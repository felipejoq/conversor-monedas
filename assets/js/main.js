import {getConvertResult} from "./controllers/converter.controller.js";
import {initApp} from "./boot.app.js";
import {
    amountInput,
    containerLoading,
    currencyConverterForm,
    currencySelect,
    infoErrorGetData
} from "./elements/html.js";

currencyConverterForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    await getConvertResult(amountInput, currencySelect);
});

// Launch app:
initApp()
    .then(ok => {
        console.log('Aplicación ok', ok);
        containerLoading.style.display = 'none';
    });