const config = require("../../config/default");
module.exports = (totalRows, page, limit) => {
    const listPage = [];
    const delta = config.delta;

    const totalPage = Math.ceil(totalRows / limit);
    const currentPage = Math.max(1, Math.min(page, totalPage || 1));
    const left = currentPage - delta;
    const right = currentPage + delta;

    let previous = 0;
    for (let i = 1; i <= totalPage; i++) {
        if (
            i === 1 ||
            i === totalPage ||
            (i >= left && i <= right)
        ) {
            if (previous && i - previous > 1) {
                listPage.push('...');
            }
            listPage.push(i);
            previous = i;
        }
    }

    return listPage;
}
//[1,...,4,5,6,7,...,10]