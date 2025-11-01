import express from 'express';
import { createRequest, getAllRequests, updateRequestStatus } from '../controllers/requestsController.js';

const router = express.Router();

// POST /api/requests
router.post('/', createRequest);

// GET /api/requests  (supports ?userId= & ?status=)
router.get('/', getAllRequests);

// PATCH /api/requests/:id
router.patch('/:id', updateRequestStatus);

export default router;