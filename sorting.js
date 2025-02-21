function mergeSort(array) {
    if (array.length == 1) {
        return array;
    }
    //Split to two halfs and then sort them, 2nd half is in the original array
    const arrayFirstHalf = array.splice(0, Math.round(array.length / 2));
    const sortedFirstHalf = mergeSort(arrayFirstHalf);
    const sortedSecondHalf = mergeSort(array);

    //merge
    const sortedArray = [];
    while (sortedFirstHalf.length > 0 && sortedSecondHalf.length > 0) {
        if (sortedFirstHalf[0] < sortedSecondHalf[0]) {
            sortedArray.push(sortedFirstHalf.shift());

        } else {
            sortedArray.push(sortedSecondHalf.shift());
        }
    }
    // Return sorted array plus whatever is left in either first or second half
    return [...sortedArray, ...sortedFirstHalf, ...sortedSecondHalf];


}

function removeDuplicates(array) {
    let newArray = [];
    array.forEach(element => {
        if (!newArray.includes(element)) {
            newArray.push(element);
        }
    });
    return newArray;
}

function sortUnique(array) {
    const noDup = removeDuplicates(array);
    return mergeSort(noDup);
}

export { sortUnique };