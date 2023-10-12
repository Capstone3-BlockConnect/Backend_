const mongoose = require('mongoose');


const storeSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    location: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        }
    },
    businessHours: {
        type: [
          {
            dayOfWeek: {
              type: String,
              enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              required: true
            },
            openingTime: String,
            closingTime: String,
            lastOrderTime: String,
            breakTimeStart: String,
            breakTimeEnd: String
          }
        ],
      },
    phoneNumber: {
        type: String,
    },
    storeDescription: String, // 가게 설명
    menu: [
        {
            name: String,
            price: Number
        }
    ],
    photos: [String], // 사진 URL 배열
    category: String
});



// 모델 생성
const Store = mongoose.model('Store', storeSchema);

module.exports = Store;