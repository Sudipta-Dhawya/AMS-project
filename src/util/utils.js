export function dbTimeHoursFormat(_time) {

    let converted = new Date(_time);
    var hours = converted.getHours();
    var minutes = converted.getMinutes();
    var seconds = converted.getSeconds();
    if (isNaN(hours)) {
        return "";
    }
    let hoursD = hours.toString().length === 1 ? "0" + hours.toString() : hours;
    return hoursD + ":" + (minutes.toString().length === 1 ? "0" + minutes.toString() : minutes);
}


export function checkValueLength(value) {
    if (value != null && value.length != 0) {
        return true;
    }
    return false;
}

export function dateDbFormat(_date) {

    let converted = new Date(_date);
    var month = converted.getMonth() + 1;
    var day = converted.getDate();
    var year = converted.getFullYear();
    return year + "-" + (month.toString().length === 1 ? "0" + month.toString() : month) + "-" + (day.toString().length === 1 ? "0" + day.toString() : day);
}