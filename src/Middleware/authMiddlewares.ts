import { Request, Response, NextFunction} from 'express';
import { verifyToken } from '../authentication/authUser';
import { UserModel, IUser } from '../routes/schemas/User';

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const token = req.headers.authorization?.split(' ')[1]; 
console.log(token);
  if (!token) {
    res.status(401).json({ error: 'No se proporcionó un token de autorización' });
    return;
  }

  try {
    const payload = verifyToken(token);

    const decodedToken = payload as { userId: string };
    const userId = decodedToken.userId;
    const user = await UserModel.findById(userId).exec();

    if (!user) {
      res.status(401).json({ error: 'Usuario no encontrado' });
      return;
    }
    if (user.roles.some(role => role.name === 'admin')) {
    
      next();
    } else {
    
      res.status(403).json({ error: 'Access denied' });
    }
    
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token de autorización inválido' });
  }
}

export default authMiddleware;
