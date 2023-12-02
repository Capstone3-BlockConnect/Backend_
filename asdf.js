const axios = require('axios');
const baseapi = axios.create({
    baseURL: 'https://backend--dwtmc.run.goorm.site',
    timeout:3000,
});

const login = async ({id:id,pw:pw}) => {
    try{
        const url = '/users/login';
        const response = await baseapi.post(url, {
            userId: id,
            password: pw
        });
        console.log(response.data);
    }
    catch(err){
        console.error(err);
    }
}

module.exports = login;


