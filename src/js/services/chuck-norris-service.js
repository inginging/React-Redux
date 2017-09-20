export function getChuckNorrisQuoteService(amount) {

    const url = "http://api.icndb.com/jokes/random";

    return fetch(url + '/' + amount);

}