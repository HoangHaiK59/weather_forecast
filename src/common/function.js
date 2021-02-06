export const createCookiebyHour = (cookieName, cookieValue, hourExpire) => {
    let date = new Date();
    date.setTime(date.getTime() + hourExpire*60*60*1000);
    document.cookie = cookieName + " = " + cookieValue + '; expires = ' + date.toGMTString();
}

export const createCookiebyDate = (cookieName, cookieValue, numberDate = 7) => {
    let date = new Date();
    date.setTime(date.getTime() + numberDate*24*60*60*1000);
    document.cookie = cookieName + " = " + cookieValue + '; expires = ' + date.toGMTString();
}