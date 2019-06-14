const getCostString = (cost) => {
    let costString = cost.toString();
    let decimalPlace = costString.indexOf('.');
    if (decimalPlace === -1) {
        let properFormat = costString + '.00';
        return properFormat
    } else if (decimalPlace === costString.length - 2) {
        let properFormat = costString +'0';
        return properFormat
    } else {
        return costString
    }
};

export default getCostString;