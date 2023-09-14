// Booting function.
import {isOldData} from "./validations/form.validations.js";
import {getDataFromLocalStorage, saveDataLocalStorage} from "./services/indicators.service.js";
import {containerLoading, currencySelect, infoErrorGetData} from "./elements/html.js";

export const initApp = async () => {

    try {
        if (await isOldData()) {
            await saveDataLocalStorage();
            return true;
        }



        let indicators;

        indicators = await getDataFromLocalStorage();

        indicators.forEach((indicator, index) => {
            const option = document.createElement('option');

            if (!indicator.info) {
                option.value = index.toString();
                option.innerText = indicator.name;
                currencySelect.appendChild(option);
            }

        });
        containerLoading.style.display = 'none';
        infoErrorGetData.style.display = 'none';
        return true;
    } catch (e) {
        infoErrorGetData.style.display = 'block';
        infoErrorGetData.innerHTML = `<p>${e}</p>`;
    }
}