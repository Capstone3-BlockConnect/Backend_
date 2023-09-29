const { reverseGeocode } = require('./geocode');
require('dotenv').config();


test('should return correct address for Seoul, South Korea', async () => {
  const latitude = 37.40612091848614;
  const longitude = 127.1163593869371;
  const expected = '서울특별시/중구/명동';
  const result = await reverseGeocode(latitude, longitude);
  expect(result).toBe(expected);
});

