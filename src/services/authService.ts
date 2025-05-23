// File: src/services/authService.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import logger from '../utils/logger';

interface AuthPayload {
  email: string;
  password: string;
}

const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

export const signupUser = async ({ email, password }: AuthPayload): Promise<{ status: number; body: any }> => {
  const existing = await User.findOne({ where: { email } });
  if (existing) {
    return { status: 400, body: { message: 'Email already exists' } };
  }

  const saltRounds = parseInt(process.env.BCRYPT_SALT || '10');
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  await User.create({ email, password: hashedPassword });

  return { status: 201, body: { message: 'User created successfully' } };
};

export const loginUser = async ({ email, password }: AuthPayload): Promise<{ status: number; body: any }> => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      logger.warn(`Login failed: User not found - ${email}`);
      return { status: 400, body: { message: 'Invalid credentials' } };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Login failed: Incorrect password - ${email}`);
      return { status: 400, body: { message: 'Invalid credentials' } };
    }

    const options = {
      expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as string | number
    } as jwt.SignOptions;

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      // { expiresIn: JWT_EXPIRES_IN }
      options
    );

    const decoded = jwt.decode(token) as { exp: number };

    logger.info(`Login successful: userId=${user.id}, email=${email}`);

    return {
      status: 200,
      body: {
        message: 'Login successful',
        data: {
          token: `Bearer ${token}`,
          expiresAt: decoded.exp,
          expiresIn: JWT_EXPIRES_IN
        }
      }
    };
  } catch (error) {
    logger.error(`Login error for email=${email}`, error);
    return { status: 500, body: { message: 'Server error' } };
  }
};