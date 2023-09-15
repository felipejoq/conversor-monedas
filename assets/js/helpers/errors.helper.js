export const showFatalError = (containerError, messageError) => {
    containerError.style.display = 'block';
    containerError.innerHTML = `<p>${messageError}</p>`;
}

export const hiddenErrors = (elementsErrors = []) => {
    elementsErrors.forEach(element => element.innerHTML = '');
}

export const showError = (elementShowError, message = 'Ocurrió un error') => {
    elementShowError.innerHTML = `<small>${message}</small>`
}
