import { Router } from 'express';
import { Request, Response } from 'express';

const router = Router();

// GET /api/progress
router.get('/', async (req: Request, res: Response) => {
  // TODO: Implement progress tracking endpoint
  res.json({ success: true, data: { message: 'Progress endpoint' } });
});

export default router;
