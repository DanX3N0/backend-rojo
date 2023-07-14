import jwt from 'jsonwebtoken';

export function generateToken(userId: string): string {
  const token = jwt.sign({ userId }, 'secret_key', { expiresIn: '2h' });
  return token;
}

export function verifyToken(token: string): string | object {
  const payload = jwt.verify(token, 'secret_key');
  return payload;
}
