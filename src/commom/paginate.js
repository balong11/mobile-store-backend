const config = require("../../config/default");
module.exports = (totalRows, page, limit) => {
    const listPage = [];
    const delta = config.delta;
    const totalPage = Math.ceil(totalRows / limit);
    let left = Math.max(2, page - delta);
    let right = Math.min(totalPage - 1, page + delta);

    listPage.push(1);

    if (left > 2) {
        listPage.push('...');
    }

    for (let i = left; i <= right; i++) {
        listPage.push(i);
    }

    if (right < totalPage - 1) {
        listPage.push('...');
    }

    if (totalPage > 1) {
        listPage.push(totalPage);
    }

    return listPage;
}
// [1, '...', 4, 5, 6, 7, '...', 10]