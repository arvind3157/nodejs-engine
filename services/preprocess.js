/**
 * ===============================================================================
 * The purpose of this module is to prepare the data before it's ready for search
 * Algorithm: Create index for each word present in the title and summary
 * The indexes are stored in the Map.
 * Map's key is token and its value is 2-d array.
 * First array stored document id and 2nd array stores frequency of the token in
 * that document
 * i.e.
 Map: {
        'token':[[1,2],[2,3]]
    }
    What it means is, the 'token' is present in the document id:1 and its frequency
    is 2. And it's also present in the document 2 and its freqency is 3
 * ================================================================================
 */ 

 /**
 * Map to store token in the below format
 {
    'token':[[record_id1,record_id2],[frequency,frequency]]
 }
 */

let map = new Map(); // global map variable to store inverted index

/**
 * exclude words that do not effect the semantic of the text
 * Note: This is not exhaustive list of exclude words
 */

let exclude_words =
    [
        'is','i','you','us','about', 'on', 'in',
        'upon', 'for', 'to','me', 'we','my','he','she',
        'should','than','that','yet','as','no','at','be','too',
        'more','was', 'also', 'it','by','which'
    ];

function preProcess(summaries, titles) {
    let s = JSON.parse(JSON.stringify(summaries)); // deep cloning to avoid modification of the original array
    let t = JSON.parse(JSON.stringify(titles));
    for(let i =0;i<s.length;i++) { // indexing summary tokens
        let arr = s[i].summary.toLowerCase().split(' '); // converting to all lowercase
        for(let j=0;j<arr.length;j++) {
            if(exclude_words.indexOf(arr[j]) === -1) { // excluding index words
                if(map.has(arr[j])) { // if map already has the tokens
                    let aa = map.get(arr[j]); // get the token array
                    if(aa[0].indexOf(s[i].id)<0) { // The given document id is listed or not
                        aa[0].push(s[i].id); // if not, create entry
                        aa[1].push(1); // mark the count as 1
                    } else {
                        let index = aa[0].indexOf(s[i].id); // if document id already found
                        let count = aa[1][index]; // get the count
                        count = count+1; // increament the count
                        aa[1][index] = count;
                    }
                } else {
                    map.set(arr[j],[[s[i].id],[1]]);
                }
            }
        }
    }
    for(let i=0;i<t.length;i++) { // indexing title tokens, follows the similar logic to index title as well
        let arr = t[i].toLowerCase().split(' ');
        for(let k=0;k<arr.length;k++) {
            if(exclude_words.indexOf(arr[k]) === -1) {
                if(map.has(arr[k])) {
                    let aa = map.get(arr[k]);
                    if(aa[0].indexOf(i)<0) {
                        aa[0].push(i);
                        aa[1].push(1);
                    } else {
                        let index = aa[0].indexOf(i);
                        let count = aa[1][index];
                        count = count+1;
                        aa[1][index] = count;
                    }
                } else {
                    map.set(arr[k],[[i],[1]]);
                }
            }
        }
    }
    return map;
}

module.exports = {
    preProcess,
    map
}