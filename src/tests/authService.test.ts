import { signupUser } from '../services/authService';

describe('Auth Service', () => {
  it('should return 400 if email already exists', async () => {
    const res = await signupUser({ email: 'existing@example.com', password: 'test123' });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Email already exists');
  }, 10000);
});