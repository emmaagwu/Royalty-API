// File: src/server.ts
import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan  from 'morgan';
import authRoutes from './routes/authRoutes';
import { sendResponse } from './utils/sendResponse';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './docs/swagger';
import { authLimiter } from './middleware/rateLimiter';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));


// Routes
app.use('/auth', authLimiter, authRoutes);

//Swagger API docs route
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Root Endpoint
app.get('/', (req: Request, res: Response) => {
  sendResponse(res, 200, true, 'Auth API is running');
});

// 404 Handler
app.use((req: Request, res: Response) => {
  sendResponse(res, 404, false, 'Route not found');
});

// Global Error Handler (optional placeholder)
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Internal server error:', err.message);
  sendResponse(res, 500, false, 'Internal server error');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
