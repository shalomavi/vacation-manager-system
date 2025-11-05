import express from 'express';
import { createRequest, getAllRequests, updateRequestStatus } from '../controllers/requestsController.js';

const router = express.Router();

router.post('/', createRequest);

router.get('/', getAllRequests);

router.patch('/:id', updateRequestStatus);

export default router;