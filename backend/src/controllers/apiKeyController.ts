import { Request, Response } from 'express';
import { PrismaClient } from '../generated/prisma';
import crypto from 'crypto';

const prisma = new PrismaClient();

interface AuthRequest extends Request {
  user?: { id: string };
}

// Generate a new API key for the authenticated user
export const generateApiKey = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const newKey = crypto.randomBytes(32).toString('hex');
    const apiKey = await prisma.apiKey.create({
      data: {
        key: newKey,
        userId: userId,
      },
    });
    res.status(201).json(apiKey);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Regenerate an existing API key
export const regenerateApiKey = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params; // API Key ID

  if (!userId) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const existingKey = await prisma.apiKey.findUnique({
      where: { id: id },
    });

    if (!existingKey || existingKey.userId !== userId) {
      return res.status(404).json({ message: 'API Key not found or not owned by user' });
    }

    const newKey = crypto.randomBytes(32).toString('hex');
    const updatedApiKey = await prisma.apiKey.update({
      where: { id: id },
      data: {
        key: newKey,
        createdAt: new Date(), // Reset creation date on regeneration
      },
    });
    res.status(200).json(updatedApiKey);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// List all API keys for the authenticated user
export const listApiKeys = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const apiKeys = await prisma.apiKey.findMany({
      where: { userId: userId },
      select: { id: true, key: true, createdAt: true, enabled: true }, // Don't expose userId
    });
    res.status(200).json(apiKeys);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete an API key
export const deleteApiKey = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params; // API Key ID

  if (!userId) {
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const existingKey = await prisma.apiKey.findUnique({
      where: { id: id },
    });

    if (!existingKey || existingKey.userId !== userId) {
      return res.status(404).json({ message: 'API Key not found or not owned by user' });
    }

    await prisma.apiKey.delete({
      where: { id: id },
    });
    res.status(204).send(); // No content
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};