import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import { verifyToken, UserModel } from '../authentication/authUser'; 

export async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'No se proporcionó un token de autorización' });
    }

    const payload = verifyToken(token);
    const userId = payload.userId;
    const user = await UserModel.findById(userId).exec();

    if (!user) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Usuario no encontrado' });
    }

    const isAdmin = user.roles.some(role => role.name === 'admin');

    if (!isAdmin) {
      return res.status(StatusCodes.FORBIDDEN).json({ error: 'Acceso denegado' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: 'Token de autorización inválido' });
  }
}