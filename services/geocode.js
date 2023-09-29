const axios = require('axios');

exports.reverseGeocode = async (latitude, longitude) => {
    try {
        // API 요청 URL 생성
        const apiUrl = `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${longitude}&y=${latitude}`;

        // API 요청 헤더 설정
        const headers = {
            Authorization: `KakaoAK ${process.env.KAKAO_REST_API_KEY}`,
        };

        // API 요청 보내기
        const response = await axios.get(apiUrl, { headers });

        // API 응답 데이터에서 필요한 정보 추출
        const { data } = response;
        const { documents } = data;
        const address = documents[1];
        const { region_1depth_name, region_2depth_name, region_3depth_name } = address;

        // 추출한 정보 출력 및 반환
        console.log(`${region_1depth_name}/${region_2depth_name}/${region_3depth_name}`);
        return `${region_1depth_name}/${region_2depth_name}/${region_3depth_name}`;
    } catch (error) {
        console.error(error);
        return null;
    }
}

