import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: { id: string };
}

export const trackUsage = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'] as string;

  if (apiKey) {
    try {
      const existingApiKey = await prisma.apiKey.findUnique({
        where: { key: apiKey },
      });

      if (existingApiKey && existingApiKey.enabled) {
        await prisma.usage.create({
          data: {
            apiKeyId: existingApiKey.id,
            endpoint: req.path,
            method: req.method,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent'],
          },
        });
      }
    } catch (error) {
      console.error('Error tracking API usage:', error);
    }
  }

  next();
};