const {Expo} = require('expo-server-sdk');

let expo = new Expo();

const sendPushNotification = async (pushToken, title, body) => {
    let messages = [];
    if(!Expo.isExpoPushToken(pushToken)){
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        return;
    }
    messages.push({
        to: pushToken,
        sound: 'default',
        title: title,
        body: body,
        data: {withSome: 'data'},
    });
    let chunks = expo.chunkPushNotifications(messages);
    (async () => {
        for(let chunk of chunks){
            try{
                let receipts = await expo.sendPushNotificationsAsync(chunk);
                console.log(receipts);
            }
            catch(error){
                console.error(error);
            }
        }
    })();
}
exports.sendPushNotification = sendPushNotification;