import { Request, Response, NextFunction } from 'express';

export const validateDataClient = async (req: Request, res: Response, next: NextFunction) => {

  const { name, lastName, email, phone, billingAddress, shippingAddress, marketingPreference } = req.body
  
  const expectedFields = ['name', 'lastName', 'email', 'phone', 'billingAddress' ,'shippingAddress','marketingPreference' ];

    const extraFields = Object.keys(req.body).filter(
      (key) => !expectedFields.includes(key)
    );

    if (extraFields.length > 0) {
      res.status(400).send('todos los campos son requeridos');
      return;
    }

    if (!name || !lastName || !email || !phone || !billingAddress || !shippingAddress || !marketingPreference ) {
      res.status(400).send('todos los campos son requeridos');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.status(400).send('ingrese un correo valido');
      return;
    }

    if (!/^[0-9]+$/.test(phone)) {
      res.status(400).send('ingrese un numero telefonico valido');
      return;
    }

  next();
};

