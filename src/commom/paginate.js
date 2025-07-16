const config = require("../../config/default");
module.exports = (totalRows, page, limit) => {

    const listPage = [];
    const delta = config.delta;
    const left = page - delta;
    const right = page + delta;
    for (let i = 1; i <= totalPage; i++) {
        if (
            i == 1 ||
            i == totalPage ||
            i == page ||
            (i >= left && i<= right)
        ) {
            listPage.push(i);
        }
    }
    return listPage;
}
//[1,...,4,5,6,7,...,10]