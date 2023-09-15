export const fillSelect = (data = [{code: '', name: ''}], select) => {
    for (const indicator of data) {
        if (!indicator.create_at) {
            const option = document.createElement('option');
            option.value = indicator.code;
            option.textContent = indicator.name;
            select.appendChild(option);
        }
    }

}
export const loadingControl = (loadingElement, action = 'show' || 'hidden') => {
    loadingElement.style.display = (action === 'show') ? 'flex' : 'none';
}
