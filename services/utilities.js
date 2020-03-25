// Sort result by score
function sortBy(result, score) {
    return result.sort((a,b)=> a[score] < b[score] ? 1 : -1)
}

function unique(value, index, self) {
    return self.indexOf(value) === index;
}

module.exports = {
    sortBy,
    unique
}