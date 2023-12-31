export function getDateCurrent() {
    let now = new Date();
    let year = now.getFullYear();
    let month = (now.getMonth() + 1).toString();
    let day = now.getDate().toString();
    let hour = now.getHours().toString();
    let minute = now.getMinutes().toString();
    let second = now.getSeconds().toString();
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        second = '0' + second;
    }
    const dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    //const dateTime = day + '-'+ month +'-'+ year + ' ' + hour + ':' + minute + ':' + second;
    return dateTime;
}

export default getDateCurrent ;