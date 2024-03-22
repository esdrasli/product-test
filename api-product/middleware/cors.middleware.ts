import { Injectable, NestMiddleware } from '@nestjs/common';
import * as cors from 'cors';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    cors()(req, res, next);
  }
}
