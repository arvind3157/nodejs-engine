const search = require('../services/search');

test('search correctly - empty result for empty string', () => {
    expect(search.search('')).toMatchObject([]);
})