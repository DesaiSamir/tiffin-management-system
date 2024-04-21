import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {
  private logger = new Logger('RequestLogging');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, baseUrl, query, body } = req;
    this.logger.log(
      `${method} ${baseUrl} query: ${JSON.stringify(query)} body: ${JSON.stringify(body)}`,
    );
    next();
  }
}
