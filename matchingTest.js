const axios = require('axios');
const { format } = require('date-fns');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const baseURL = 'http://localhost:3000'; // replace with your server's URL
const categories = ['한식', '일식', '양식'];
const times = ['12:00', '13:00', '18:00', '19:00'];

async function matchingTest() {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        today.setHours(today.getHours() + 9);
        const formattedDate = format(today, 'yyyy-MM-dd');
        console.log(formattedDate);
        // signup 100 users
        const tokens = [];
        const users = [];
        rl.question(' 시작 Press any key to continue...', async (answer) => {
            console.log('GO!');
        });
        for (let i = 0; i < 100; i++) {
            const formData = new URLSearchParams();
            formData.append('userId', `test${i}`);
            formData.append('password', '1234');
            formData.append('nickname', `test${i}`);
            formData.append('gender', '남성');
            formData.append('age', '20');
            formData.append('phoneNumber', `01012345678${i}`);
            formData.append('foodCategory', '한식');
            const response = await axios.post(`${baseURL}/users/signup`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'accept': 'application/json'
                }
            });
            tokens.push(response.data.token);
            users.push(response.data.user);
        }
        rl.question('계정생성 완료 Press any key to continue...', async (answer) => {
            console.log('GO!');
        });

        // create 100 matching requests
        const matchingRequests = [];
        const statistics = {};
        for (let i = 0; i < times.length; i++) {
            statistics[times[i]] = {};
            for (let j = 0; j < categories.length; j++) {
                statistics[times[i]][categories[j]] = 0;
            }
        }
        for (let i = 0; i < 100; i++) {
            console.log(i);
            const formData = new URLSearchParams();
            formData.append('date', formattedDate);

            const randomTimeIndex = Math.floor(Math.random() * times.length);
            formData.append('time', times[randomTimeIndex]);

            const randomCategoryIndex = Math.floor(Math.random() * categories.length);
            formData.append('category', categories[randomCategoryIndex]);

            formData.append('memo', `test${i}의 매칭요청입니다`);
            const response = await axios.post(`${baseURL}/matchings/request`, formData, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'accept': 'application/json',
                    'Authorization': `${tokens[i]}`
                }
            });
            statistics[times[randomTimeIndex]][categories[randomCategoryIndex]] = statistics[times[randomTimeIndex]][categories[randomCategoryIndex]] ? statistics[times[randomTimeIndex]][categories[randomCategoryIndex]] + 1 : 1;
            matchingRequests.push(response.data.matchingRequest);
            console.log("asdf");
        }
        console.log(statistics);
    }
    catch (err) {
        console.log(err);
    }
}
matchingTest();