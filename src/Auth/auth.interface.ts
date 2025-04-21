import { Request } from 'express';
import User from '../Entities/user.entity';

export interface RequestWithUser extends Request {
  user: User;
}

export interface TokenPayload {
  userId: number;
}
