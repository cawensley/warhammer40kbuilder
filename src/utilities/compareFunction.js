function compareFunction(a, b) {
    const NameA = a.Name.toUpperCase();
    const NameB = b.Name.toUpperCase();

    let comparison = 0;
    if (NameA > NameB) {
        comparison = 1;
    } else if (NameA < NameB) {
        comparison = -1;
    }
    return comparison;
}

export default compareFunction;