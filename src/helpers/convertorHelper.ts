const convertNumberToSymbol = (volume: number) => {
    if (volume >= 1_000_000_000) {
        return (volume / 1_000_000_000).toFixed(2) + ' B'; // Billion
    } else if (volume >= 1_000_000) {
        return (volume / 1_000_000).toFixed(2) + ' M'; // Million
    } else if (volume >= 1_000) {
        return (volume / 1_000).toFixed(2) + ' K'; // Thousand
    } else {
        return volume.toString();
    }
}

export{
    convertNumberToSymbol
}
