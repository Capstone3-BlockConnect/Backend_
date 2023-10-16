const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Store:
 *       type: object
 *       properties:
 *         storeName:
 *           type: string
 *           description: The name of the store
 *         genre:
 *           type: string
 *           description: The genre of the store
 *         address:
 *           type: string
 *           description: The address of the store
 *         location:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *               description: The latitude coordinate of the store location
 *             longitude:
 *               type: number
 *               description: The longitude coordinate of the store location
 *         businessHours:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               dayOfWeek:
 *                 type: string
 *                 description: The day of the week
 *               hoursInfo:
 *                 type: object
 *                 properties:
 *                   openingTime:
 *                     type: string
 *                     description: The opening time of the store on the specified day
 *                   closingTime:
 *                     type: string
 *                     description: The closing time of the store on the specified day
 *                   lastOrderTime:
 *                     type: string
 *                     description: The last order time of the store on the specified day
 *                   breakTimeStart:
 *                     type: string
 *                     description: The start time of the break on the specified day
 *                   breakTimeEnd:
 *                     type: string
 *                     description: The end time of the break on the specified day
 *           description: The business hours of the store for each day of the week
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the store
 *         storeDescription:
 *           type: string
 *           description: Description of the store
 *         menu:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the menu item
 *               price:
 *                 type: string
 *                 description: The price of the menu item
 *           description: The menu items available at the store
 *         photos:
 *           type: array
 *           items:
 *             type: string
 *           description: URLs of photos of the store
 *         category:
 *           type: string
 *           description: The category of the store
 */
const storeSchema = new mongoose.Schema({
    storeName: {
        type: String,
        required: true
    },
    genre: String,
    address: String,
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
              required: true
            },
            hoursInfo: {
              openingTime: String,
              closingTime: String,
              lastOrderTime: String,
              breakTimeStart: String,
              breakTimeEnd: String
            }
          }
        ],
      },
    phoneNumber: String,
    storeDescription: String, // 가게 설명
    menu: [
        {
            name: String,
            price: String
        }
    ],
    photos: [String], // 사진 URL 배열
    category: String,

});



// 모델 생성
const Store = mongoose.model('Store', storeSchema);

module.exports = Store;