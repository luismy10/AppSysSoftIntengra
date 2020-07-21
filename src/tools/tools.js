export function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
        const negativeSign = amount < 0 ? "-" : "";
        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;
        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
}

export function filterWhole(event) {
    var key = window.Event ? event.which : event.keyCode;
    var c = String.fromCharCode(key);
    if ((c < '0' || c > '9') && (c != '\b')) {
        event.preventDefault();
    }
}

export function filterFloat(event, referent) {
    var key = window.Event ? event.which : event.keyCode;
    var c = String.fromCharCode(key);
    if ((c < '0' || c > '9') && (c != '\b') && (c != '.')) {
        event.preventDefault();
    }
    if (c == '.' && referent.current.value.includes(".") ) {
        event.preventDefault();
    }
}

export function filterFloatOnly(event,currentTarget) {
    var key = window.Event ? event.which : event.keyCode;
    var c = String.fromCharCode(key);
    if ((c < '0' || c > '9') && (c != '\b') && (c != '.')) {
        event.preventDefault();
    }
    if (c == '.' && currentTarget.value.includes(".") ) {
        event.preventDefault();
    }
}

export function isNumeric(value) {
    if (value.trim().length == 0 || value == 'undefined') return false;
    if (isNaN(value.trim())) {
        return false;
    } else {
        return true;
    }
}

export function isEmpty(obj) {
    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    if (typeof obj !== "object") return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
    return true;
}

export function getCurrentDate() {
    let today = new Date();
    let formatted_date = today.getFullYear() + "-" + ((today.getMonth() + 1) > 9 ? (today.getMonth() + 1) : '0' + (today.getMonth() + 1)) + "-" + (today.getDate() > 9 ? today.getDate() : '0' + today.getDate());
    return formatted_date;
}

export function getCurrentTime() {
    let today = new Date();
    let formatted_time = (today.getHours() > 9 ? today.getHours() : '0' + today.getHours()) + ":" + (today.getMinutes() > 9 ? today.getMinutes() : '0' + today.getMinutes()) + ":" + (today.getSeconds() > 9 ? today.getSeconds() : '0' + today.getSeconds());
    return formatted_time;
}

export function getDomain(){
    let subruta = "http://192.168.1.40:8080/SysSoftIntegraBackEnd";
    return subruta;  
}
