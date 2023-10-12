const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0', // OpenAPI 버전
    info: {
      title: 'Block_connect',
      version: '0.2',
      description: '아아아',
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