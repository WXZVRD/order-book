export const formatToCurrency = (num) => {
    return num.toLocaleString(
        'en-US',
        { minimumFractionDigits: 2 },
        { maximumFractionDigits: 2 }
    );
};

export const formatLongNumber = (num) => {
    return num.toLocaleString(
        'en-US',
        { minimumFractionDigits: 5},
        { maximumFractionDigits: 5 }
    );
}

const clone = (arr) => {
    return arr.map((element) => {
        return element.slice();
    });
};

export const manageOrderBook = (
    snapshotPriceArr,
    depthUpdatePriceArr,
    type
) => {
    const newArr = clone(snapshotPriceArr);
    let sorted = true;
    if (depthUpdatePriceArr.length > 0) {
        depthUpdatePriceArr.forEach((update) => {
            const index = newArr.findIndex((element) => element[0] === update[0]);
            if (index !== -1) {
                if (update[1] === '0.00000000') {
                    newArr.splice(index, 1);
                }
                if (update[1] !== '0.00000000') {
                    newArr[index][1] = update[1];
                }
            }

            if (index === -1 && update[1] !== '0.00000000') {
                newArr.push(update);
                sorted = false;
            }
        });
        if (sorted === false) {
            if (type === 'bids') {
                newArr.sort((a, b) => b[0] - a[0]);
            }
            if (type === 'asks') {
                newArr.sort((a, b) => a[0] - b[0]);
            }
        }
    }
    return newArr;
};