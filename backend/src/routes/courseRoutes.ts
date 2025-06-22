import { Router } from 'express';
import { Request, Response } from 'express';

const router = Router();

// GET /api/courses
router.get('/', async (req: Request, res: Response) => {
  // TODO: Implement courses listing endpoint
  res.json({ success: true, data: { message: 'Courses endpoint' } });
});

export default router;
