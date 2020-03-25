const preprocessor = require('./preprocess');
const utils = require('./utilities');

// The sample data to be exported from data.json
let summaries = require('../data/data.json').summaries;
let titles = require('../data/data.json').titles;
preprocessor.preProcess(summaries, titles); // Preprocess the data when module loads
let map = preprocessor.map;

const search = (query, k=5) => {
    let a = query.split(' ');
    let ids = [];
    for(let i=0;i<a.length;i++) {
        if(map.has(a[i])) {
            let arr = map.get(a[i])[0];
            ids = [...ids, ...arr]
        }
    }
    ids = ids.filter(utils.unique);
    let result = [];
    for(let k=0;k<ids.length;k++) {
        result.push(summaries[ids[k]])
    }
    for(let i=0;i<result.length;i++) {
        result[i].title = titles[result[i].id]
    }
    result = applyScore(result, query); // Attach score to each result
    result = utils.sortBy(result,'score'); // Sort result by score
    return result.slice(0, k); // Pick top k relevant result
}

// Attach score to each result based on certain criteria
// number of token match has highest weightage (n*0.05)
// number of times token appeared has 2nd highest weightage (m*0.02)
// final_score = base_score+n*0.05+m*0.02
function applyScore(result, str) {
    let tokens = str.split(' ');
    for(let i=0;i<result.length;i++) {
        result[i].score = 0;
        for(let j=0;j<tokens.length;j++) { // Calculates highest number of token match
            if(map.has(tokens[j])) {
                let m = map.get(tokens[j]);
                if(m[0].indexOf(result[i].id)>0) {
                    result[i].score = result[i].score+0.05; // Keep adding score of 0.05 for every match
                    let index = m[0].indexOf(result[i].id);
                    result[i].score = result[i].score+m[1][index]*0.02; // Multiply with frequency of the token
                }
            }
        }
    }
    return result;
}

module.exports = {
    search
}