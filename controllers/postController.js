const Post = require('../models/postModel');
const User = require('../models/userModel');

exports.getAllPosts = async (req, res) => {
    try {
        // 데이터베이스에서 모든 게시글 가져오기
        const posts = await Post.find();

        // 게시글 목록을 JSON 형태로 반환
        res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 에러' });
    }
};

exports.getPost = async (req, res) => {
    try {
        // ID로 게시글 찾기 및 조회수 상승
        const post = await Post.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } }, { new: true });

        // 게시글이 존재하지 않으면 404 Not Found 에러 반환
        if (!post) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다' });
        }

        // 게시글을 JSON 형태로 반환
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 에러' });
    }
};

exports.createPost = async (req, res) => {
    try {
        // 요청 본문에서 데이터 가져오기
        const { title, content, tags, type, price, expirationDate } = req.body;
        // 로그인한 사용자 정보 가져오기
        const user = req.user;
        const foundUser = await User.findById(user);
        const region = foundUser.region;
        const authorNickname = foundUser.nickname;

        // 새 게시글 객체 생성
        const post = new Post({
            title,
            author: user,
            content,
            tags,
            type,
            price,
            expirationDate,
            region,
            authorNickname
        });

        // 게시글 객체를 데이터베이스에 저장
        await post.save();

        // 새 게시글을 JSON 형태로 반환
        res.status(201).json(post);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            // 유효성 검사 에러인 경우
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: errors.join(', ') });
        } else {
            // 그 외의 에러인 경우
            console.error(error);
            res.status(500).json({ message: '서버 에러' });
        }
    }
};

exports.modifyPost = async (req, res) => {
    try {
        // ID로 게시글 찾기
        const post = await Post.findById(req.params.id);

        // 게시글이 존재하지 않으면 404 Not Found 에러 반환
        if (!post) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다' });
        }

        // 사용자가 게시글 작성자인지 확인
        if (post.author != req.user) {
            return res.status(403).json({ message: '작성자만 수정 가능합니다' });
        }

        // 요청 본문에서 데이터 가져오기
        const { title, content, tags, type, price, expirationDate } = req.body;

        // 로그인한 사용자 정보 가져오기
        const foundUser = await User.findById(req.user);
        const region = foundUser.region;
        const authorNickname = foundUser.nickname;

        // 게시글 객체 업데이트
        post.title = title;
        post.content = content;
        post.tags = tags;
        post.type = type;
        post.price = price;
        post.expirationDate = expirationDate;

        // 업데이트된 게시글을 데이터베이스에 저장
        await post.save();

        // 업데이트된 게시글을 JSON 형태로 반환
        res.status(200).json(post);
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            // 유효성 검사 에러인 경우
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: errors.join(', ') });
        } else {
            // 그 외의 에러인 경우
            console.error(error);
            res.status(500).json({ message: '서버 에러' });
        }
    }
};

// 게시글을 삭제하는 함수
exports.deletePost = async (req, res) => {
    try {
        // ID로 게시글 찾기
        const post = await Post.findById(req.params.id);

        // 게시글이 존재하지 않으면 404 Not Found 에러 반환
        if (!post) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다' });
        }

        // 사용자가 게시글 작성자인지 확인
        if (post.author != req.user) {
            return res.status(403).json({ message: '작성자만 삭제 가능합니다' });
        }

        // 게시글 삭제
        await post.deleteOne();

        // 성공 메시지를 JSON 형태로 반환
        res.status(200).json({ message: '게시글이 삭제되었습니다' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 에러' });
    }
};


// 추천수를 올리면서 추천인을 검색해서 이미 추천했으면 추천을 취소하고, 추천하지 않았으면 추천을 한다.
// 반환값은 추천수
exports.upvotePost = async (req, res) => {
    try {
        // ID로 게시글 찾기
        const post = await Post.findById(req.params.id);

        // 게시글이 존재하지 않으면 404 Not Found 에러 반환
        if (!post) {
            return res.status(404).json({ message: '게시글을 찾을 수 없습니다' });
        }

        // 사용자가 이미 게시글을 추천했는지 확인
        const alreadyUpvoted = post.upvotedUsers.includes(req.user);

        // 사용자가 이미 게시글을 추천했다면 추천 취소
        if (alreadyUpvoted) {
            post.upvotedUsers.pull(req.user);
            post.upvotes--;
        } else {

            // 사용자가 게시글을 추천하지 않았다면 추천
            post.upvotedUsers.push(req.user);
            post.upvotes++;
        }

        // 업데이트된 게시글을 데이터베이스에 저장
        const updatedPost = await post.save();

        // 추천수와 이미 추천 여부를 JSON 형태로 반환
        res.status(200).json({ upvotes: updatedPost.upvotes, alreadyUpvoted: !alreadyUpvoted });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '서버 에러' });
    }
};