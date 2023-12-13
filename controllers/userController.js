const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { MongoError } = require('mongodb');
const MatchingRequest = require('../models/matchingRequestModel');
const Matching = require('../models/matchingModel');
const { sendPushNotification } = require('../services/pushNotification');


exports.signup = async (req, res) => {
    try {
        let { userId, password, nickname, gender, age, phoneNumber, foodCategory } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        if (!nickname) {
            const adjectives = [
                "빠른", "느린", "큰", "작은", "밝은", "어두운", "강한", "약한", "뜨거운", "차가운",
                "신선한", "낡은", "예쁜", "못생긴", "행복한", "슬픈", "즐거운", "지루한", "재미있는", "따분한",
                "부유한", "가난한", "건강한", "아픈", "영리한", "어리석은", "친절한", "무례한", "용감한", "겁쟁이",
                "사랑스러운", "미움받는", "성공적인", "실패한", "조용한", "시끄러운", "청결한", "더러운", "매끄러운", "거친",
                "평범한", "특별한", "현대적인", "고전적인", "전통적인", "혁신적인", "유명한", "미명한", "희귀한", "흔한",
                "긴", "짧은", "넓은", "좁은", "높은", "낮은", "무거운", "가벼운", "두꺼운", "얇은",
                "안전한", "위험한", "강력한", "약한", "신선한", "썩은", "달콤한", "쓴", "신", "짠",
                "시원한", "더운", "맑은", "흐린", "평화로운", "소란스러운", "긍정적인", "부정적인", "희망찬", "절망적인",
                "풍부한", "부족한", "귀여운", "무서운", "감각적인", "무디한", "밝은색", "어두운색", "화려한", "소박한",
                "현명한", "어리석은", "발랄한", "우울한", "활기찬", "무기력한", "신비로운", "명확한", "빈티지", "현대적인"
            ];
            const nouns = [
                "바다", "산", "강", "하늘", "구름", "나무", "꽃", "풀", "새", "나비",
                "고양이", "개", "말", "소", "양", "돼지", "닭", "오리", "물고기", "거북이",
                "자동차", "버스", "기차", "비행기", "배", "자전거", "오토바이", "트럭", "헬리콥터", "로켓",
                "집", "학교", "병원", "공장", "상점", "도서관", "박물관", "교회", "사원", "성",
                "컴퓨터", "휴대폰", "태블릿", "텔레비전", "라디오", "시계", "카메라", "프린터", "스피커", "헤드폰",
                "책", "잡지", "신문", "노트", "연필", "펜", "지우개", "자", "계산기", "붓",
                "의자", "테이블", "침대", "소파", "장식장", "책장", "옷장", "거울", "카펫", "커튼",
                "접시", "컵", "그릇", "칼", "포크", "숟가락", "도마", "냄비", "프라이팬", "전기주전자",
                "사과", "바나나", "오렌지", "포도", "딸기", "수박", "참외", "복숭아", "키위", "망고",
                "셔츠", "바지", "치마", "드레스", "코트", "자켓", "신발", "모자", "장갑", "스카프"
            ];
            while (true) {
                const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
                const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
                const randomNickname = randomAdjective + " " + randomNoun;
                console.log(randomNickname);
                if (await User.findOne({ nickname: randomNickname })) {
                    continue;
                }
                else {
                    nickname = randomNickname;
                    break;
                }
            }
        }
        const user = new User({
            userId,
            password: hashedPassword,
            nickname,
            gender,
            age,
            phoneNumber,
            foodCategory,
        });
        await user.save();
        const token = 'Bearer ' + jwt.sign({ user: user._id }, process.env.JWT_SECRET);
        user.password = undefined;
        res.status(201).json({ message: 'User created', token, user });
    }
    catch (err) {
        console.log(err);
        if (err instanceof MongoError && err.code === 11000) {
            return res.status(409).json({ message: 'Id나 nickname 또는 phoneNumber가 이미 존재합니다' });
        }
        else if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

// Login
exports.login = async (req, res) => {
    try {
        const { userId, password } = req.body;
        const user = await User.findOne({ userId });
        if (!user) {
            return res.status(401).json({ message: '없는 사용자 입니다' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(402).json({ message: '비밀번호가 일치하지 않습니다' });
        }
        const token = 'Bearer ' + jwt.sign({ user: user._id }, process.env.JWT_SECRET);
        user.password = undefined;
        res.status(200).json({ message: 'Login success', token, user });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 }); // 비밀번호 필드를 제외하고 조회
        res.status(200).json({ users });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id, { password: 0 });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        res.status(200).json({ user });

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

exports.getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user, { password: 0 });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        res.status(200).json({ user });

    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.modifyProfile = async (req, res) => {
    try {
        const { oldPassword, newPassword, nickname, gender, age, phoneNumber, foodCategory } = req.body;
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(402).json({ message: '비밀번호가 일치하지 않습니다' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.nickname = nickname;
        user.gender = gender;
        user.age = age;
        user.phoneNumber = phoneNumber;
        user.foodCategory = foodCategory;
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ message: 'User modified', user });
    } catch (err) {
        console.log(err);
        if (err instanceof MongoError && err.code === 11000) {
            return res.status(409).json({ message: 'Id나 nickname 또는 phoneNumber가 이미 존재합니다' });
        } else if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { password } = req.body;
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(402).json({ message: '비밀번호가 일치하지 않습니다' });
        }
        const matchingRequests = await MatchingRequest.find({ user: req.user });
        if (matchingRequests.length > 0) {
            return res.status(403).json({ message: '매칭 요청이 존재합니다' });
        }
        const matchings = await Matching.find({ user: req.user });
        if (matchings.length > 0) {
            return res.status(403).json({ message: '매칭이 존재합니다' });
        }
        await user.deleteOne();
        res.status(200).json({ message: 'User deleted' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.deleteAllUsers = async (req, res) => {
    try {
        await User.deleteMany({});
        res.status(200).json({ message: 'All users deleted' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.createRandomNickname = async (req, res) => {
    try {
        const adjectives = [
            "빠른", "느린", "큰", "작은", "밝은", "어두운", "강한", "약한", "뜨거운", "차가운",
            "신선한", "낡은", "예쁜", "못생긴", "행복한", "슬픈", "즐거운", "지루한", "재미있는", "따분한",
            "부유한", "가난한", "건강한", "아픈", "영리한", "어리석은", "친절한", "무례한", "용감한", "겁쟁이",
            "사랑스러운", "미움받는", "성공적인", "실패한", "조용한", "시끄러운", "청결한", "더러운", "매끄러운", "거친",
            "평범한", "특별한", "현대적인", "고전적인", "전통적인", "혁신적인", "유명한", "미명한", "희귀한", "흔한",
            "긴", "짧은", "넓은", "좁은", "높은", "낮은", "무거운", "가벼운", "두꺼운", "얇은",
            "안전한", "위험한", "강력한", "약한", "신선한", "썩은", "달콤한", "쓴", "신", "짠",
            "시원한", "더운", "맑은", "흐린", "평화로운", "소란스러운", "긍정적인", "부정적인", "희망찬", "절망적인",
            "풍부한", "부족한", "귀여운", "무서운", "감각적인", "무디한", "밝은색", "어두운색", "화려한", "소박한",
            "현명한", "어리석은", "발랄한", "우울한", "활기찬", "무기력한", "신비로운", "명확한", "빈티지", "현대적인"
        ];
        const nouns = [
            "바다", "산", "강", "하늘", "구름", "나무", "꽃", "풀", "새", "나비",
            "고양이", "개", "말", "소", "양", "돼지", "닭", "오리", "물고기", "거북이",
            "자동차", "버스", "기차", "비행기", "배", "자전거", "오토바이", "트럭", "헬리콥터", "로켓",
            "집", "학교", "병원", "공장", "상점", "도서관", "박물관", "교회", "사원", "성",
            "컴퓨터", "휴대폰", "태블릿", "텔레비전", "라디오", "시계", "카메라", "프린터", "스피커", "헤드폰",
            "책", "잡지", "신문", "노트", "연필", "펜", "지우개", "자", "계산기", "붓",
            "의자", "테이블", "침대", "소파", "장식장", "책장", "옷장", "거울", "카펫", "커튼",
            "접시", "컵", "그릇", "칼", "포크", "숟가락", "도마", "냄비", "프라이팬", "전기주전자",
            "사과", "바나나", "오렌지", "포도", "딸기", "수박", "참외", "복숭아", "키위", "망고",
            "셔츠", "바지", "치마", "드레스", "코트", "자켓", "신발", "모자", "장갑", "스카프"
        ];
        while (true) {
            const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
            const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
            const randomNickname = randomAdjective + " " + randomNoun;
            if (await User.findOne({ nickname: randomNickname })) {
                continue;
            }
            else {
                return res.status(200).json({ randomNickname });
            }
        }

    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.modifyMyOpenChatLink = async (req, res) => {
    try {
        const { openChatLink } = req.body;
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        user.openChatLink = openChatLink;
        await user.save();
        res.status(200).json({ message: 'User modified' });
    } catch (err) {
        console.log(err);
        if (err instanceof MongoError && err.code === 11000) {
            return res.status(409).json({ message: 'Id나 nickname 또는 phoneNumber가 이미 존재합니다' });
        } else if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
exports.getMyOpenChatLink = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        res.status(200).json({ openChatLink: user.openChatLink });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.deleteMyOpenChatLink = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        user.openChatLink = undefined;
        await user.save();
        res.status(200).json({ message: 'User modified' });
    } catch (err) {
        console.log(err);
        if (err instanceof MongoError && err.code === 11000) {
            return res.status(409).json({ message: 'Id나 nickname 또는 phoneNumber가 이미 존재합니다' });
        } else if (err.name === 'ValidationError') {
            return res.status(400).json({ message: err.message });
        }
        else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}
exports.getOpenChatLink = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        res.status(200).json({ openChatLink: user.openChatLink });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.addPushToken = async (req, res) => {
    try {
        const user = await User.findById(req.user);
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const { pushToken } = req.body;
        user.pushToken = pushToken;
        await user.save();
        res.status(200).json({ message: 'add pushToken' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
exports.sendPushNotification = async (req, res) => {
    try {
        const { pushToken, title, body } = req.body;
        sendPushNotification(pushToken, title, body);
        return res.status(200).json({ message: 'send push notification' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Internal server error' });
    }
}
