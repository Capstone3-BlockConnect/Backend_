const schedule = require('node-schedule');
const MatchingRequest = require('../models/matchingRequestModel');
const mongoose = require('mongoose');
const { MongoError } = require('mongodb');
const Matching = require('../models/matchingModel');
const Store = require('../models/storeModel');
const {format} = require('date-fns');  

async function matching() {
    console.log("매칭 시작");
    try {
        const times = MatchingRequest.schema.path('time').enumValues;
        const categories = MatchingRequest.schema.path('category').enumValues;
        const today = new Date();
        console.log(today);
        today.setHours(today.getHours() + 9);
        console.log(today);
        today.setUTCHours(0, 0, 0, 0);
        console.log(today);

        for (let j = 0; j < categories.length; j++) {
            const stores = await Store.find({ category: categories[j] });
            for (let i = 0; i < times.length; i++) {
                const matchingRequests = await MatchingRequest.find({ date: today, time: times[i], category: categories[j] }).sort({ requestTime: 1 });
                while (true) {
                    if (matchingRequests.length > 1) {
                        const matching = new Matching({
                            date: today,
                            time: times[i],
                            store: getRandomStore(stores, today, times[i]),
                            user1Memo: matchingRequests[0].memo,
                            user2Memo: matchingRequests[1].memo,
                            user1: matchingRequests[0].user,
                            user2: matchingRequests[1].user,
                            category: categories[j]
                        });
                        await matching.save();
                        await MatchingRequest.findByIdAndDelete(matchingRequests[0]._id);
                        await MatchingRequest.findByIdAndDelete(matchingRequests[1]._id);
                        matchingRequests.splice(0, 2);
                    }
                    else {
                        // 한명만 남으면
                        if (matchingRequests.length == 1) {
                            //매칭실패 알림보내고 지우기
                            console.log(matchingRequests[0].user + "님 매칭실패 알림보내기")
                            await MatchingRequest.findByIdAndDelete(matchingRequests[0]._id);
                        }
                        break;
                    }
                }
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    console.log("매칭 끝");
}
function getRandomStore(stores, date, time) {
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    while (true) {
        const randomIndex = Math.floor(Math.random() * stores.length);
        const randomStore = stores[randomIndex];
        const isTrue = randomStore.businessHours.find((openDay) => {
            if (openDay.dayOfWeek == daysOfWeek[date.getDay()] || openDay.dayOfWeek == '매일') {
                if (openDay.hoursInfo.openingTime <= time && openDay.hoursInfo.closingTime >= time) {
                    if (openDay.hoursInfo.breakTimeStart == undefined || (openDay.hoursInfo.breakTimeStart > time || openDay.hoursInfo.breakTimeEnd < time)) {
                        if (openDay.hoursInfo.lastOrderTime == undefined || openDay.hoursInfo.lastOrderTime > time) {
                            return true;
                        }
                    }
                }
            }
            return false;
        })
        if (isTrue) {
            return randomStore._id;
        }
        else {
            continue;
        }
    }
}

const rule = new schedule.RecurrenceRule();
rule.minute = new schedule.Range(0,59,5);//일단 5분에 한번씩 오늘자 매칭생성

const job = schedule.scheduleJob(rule, matching);
module.exports = job;