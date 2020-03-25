const search = require('../services/search');

test('search correctly - empty result for empty string', () => {
    expect(search.search('')).toMatchObject([]);
})

test('search correctly - non-empty result for non-empty string', () => {
    expect(search.search('the problem is')[0].id).toBe(18);
})

test('search correctly - get top k results only', () => {
    expect(search.search('the problem is',5).length).toBe(5);
})