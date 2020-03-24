// The sample data to be exported from data.json
let summaries = require('../data/data.json').summaries;
let titles = require('../data/data.json').titles;

//console.log('titles', titles);

/**
 * exclude words that do not effect the semantic of the text
 * Note: This is not exhaustive list of exclude words
 */

let exclude_words =
    [
        'is','i','you','us','about', 'on', 'in',
        'upon', 'for', 'to','me', 'we','my','he','she',
        'should','than','that','yet','as','no','at','be'
    ];

/**
 * Map to store token in the below format
 {
    'token':[[record_id1,record_id2],[frequency,frequency]]
 }
 */
let map = new Map();

function preProcess(summaries) {
    // deep cloning to avoid modification of the original array
    let s = JSON.parse(JSON.stringify(summaries));
    for(let i =0;i<s.length;i++) {
        let arr = s[i].summary.toLowerCase().split(' ');
        for(let j=0;j<arr.length;j++) {
            if(exclude_words.indexOf(arr[j]) === -1) {
                if(map.has(arr[j])) {
                    let aa = map.get(arr[j]);
                    if(aa[0].indexOf(s[i].id)<0) {
                        aa[0].push(s[i].id);
                        aa[1].push(1);
                    } else {
                        let index = aa[0].indexOf(s[i].id);
                        let count = aa[1][index];
                        count = count+1;
                        aa[1][index] = count;
                    }
                } else {
                    map.set(arr[j],[[s[i].id],[1]]);
                }
            }
        }
    }
    return map;
}

function unique(value, index, self) {
    return self.indexOf(value) === index;
}

const search = (query, k=5) => {
    let a = query.split(' ');
    let ids = [];
    for(let i=0;i<a.length;i++) {
        if(map.has(a[i])) {
            let arr = map.get(a[i])[0];
            ids = [...ids, ...arr]
        }
    }
    ids = ids.filter(unique);
    let result = [];
    for(let k=0;k<ids.length;k++) {
        result.push(summaries[ids[k]])
    }
    for(let i=0;i<result.length;i++) {
        result[i].title = titles[result[i].id]
    }
    return result.slice(0, k);
}

preProcess(summaries);

module.exports = {
    search
}