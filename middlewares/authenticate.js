const jwt = require('jsonwebtoken');

exports.authenticate = (req, res, next) => {
    // 요청 헤더에서 토큰 가져오기
    const header = req.header('Authorization');

    // 인증 헤더가 있는지 확인
    if (!header) {
        return res.status(401).json({ msg: '인증 헤더가 없습니다. 인증이 거부되었습니다.' });
    }

    // 인증 헤더가 Bearer 스키마를 가지고 있는지 확인
    const authParts = header.split(' ');
    if (authParts.length !== 2 || authParts[0] !== 'Bearer') {
        return res.status(401).json({ msg: '잘못된 인증 헤더입니다. 인증이 거부되었습니다.' });
    }

    const token = authParts[1];

    try {
        // 토큰 검증
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // 요청 객체에 사용자 설정
        req.user = decoded.user;

        next();
    } catch (err) {
        res.status(401).json({ msg: '유효하지 않은 토큰입니다.' });
    }
};

