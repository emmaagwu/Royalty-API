import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth API',
      version: '1.0.0',
      description: 'Authentication API with JWT, built using Express and TypeScript',
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['src/routes/*.ts'], // We'll write comments in route files
};

const specs = swaggerJsdoc(options);
export default specs;
