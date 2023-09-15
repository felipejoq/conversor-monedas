export const formatDateToLocale = (date) => {
    return new Date(date)
        .toLocaleDateString("es-CL", {
            weekday: "long",
            day: "2-digit",
            month: "long",
            year: "numeric",
            timeZone: 'America/Santiago'
        });
}

export const formatNumberToLocale = (number) => {
    let CLPFormat = new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        maximumFractionDigits: 5
    });
    return CLPFormat.format(number);
}

export const formatDateStandardCL = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CL', {timeZone: 'America/Santiago'})
}