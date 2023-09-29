const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // OpenAPI 버전
    info: {
      title: 'Block_connect',
      version: '0.2',
      description: '일단 post/{id}의 id는 post의 _id를 의미한다. 조회를 제외한 생성 수정 삭제 및 추천은 로그인 해야한다. \
      로그인이 필요한 api는 옆에 자물쇠 문양으로 판단가능하며 로그인이나 회원가입할 때 token을 api문서페이지 최상단 Authorize에 붙여넣으면 토큰기반인증으로 로그인 가능하다.\
       글 수정이나 삭제 사용자계정 수정은 자신의 글이나 계정만 가능하다. ',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  // API 주석 파일의 경로
  apis: ['./routes/*.js'], // 주석이 있는 모든 라우트 파일을 스캔
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;