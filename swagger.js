const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // OpenAPI 버전
    info: {
      title: 'API 문서',
      version: '1.0.0',
      description: 'API 문서 예제',
    },
  },
  // API 주석 파일의 경로
  apis: ['./routes/*.js'], // 주석이 있는 모든 라우트 파일을 스캔
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;