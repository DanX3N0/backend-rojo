import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const validateDataClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, lastName, email, phone, billingAddress, shippingAddress, marketingPreference } = req.body;
  const expectedFields = ['name', 'lastName', 'email', 'phone', 'billingAddress', 'shippingAddress', 'marketingPreference'];

  const extraFields = Object.keys(req.body).filter(
    (key) => !expectedFields.includes(key)
  );

  if (extraFields.length > 0) {
    res.status(StatusCodes.BAD_REQUEST).send('All fields are required');
    return;
  }

  if (!name || !lastName || !email || !phone || !billingAddress || !shippingAddress || !marketingPreference) {
    res.status(StatusCodes.BAD_REQUEST).send('All fields are required');
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(StatusCodes.BAD_REQUEST).send('Enter a valid email address');
    return;
  }

  if (!/^[0-9]+$/.test(phone)) {
    res.status(StatusCodes.BAD_REQUEST).send('Enter a valid phone number');
    return;
  }

  next();
};
