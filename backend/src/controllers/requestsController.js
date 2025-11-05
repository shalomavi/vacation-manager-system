import VacationRequest from '../models/requests.model.js';

// Create a new vacation request
export const createRequest = async (req, res) => {
  const { user_id, start_date, end_date, reason } = req.body;
  try {
    const newRequest = await VacationRequest.create({
      user_id,
      start_date,
      end_date,
      reason,
      status: 'pending',
      comments: '',
      created_at: new Date(),
    });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: 'Error creating vacation request', error });
  }
};

// Get all vacation requests (supports optional ?userId=&status=)
export const getAllRequests = async (req, res) => {
  try {
    const { userId, status } = req.query;
    const where = {};
    if (userId) where.user_id = userId;
    if (status) where.status = status;
    const requests = await VacationRequest.findAllWithUserNames({ 
        where, 
        orderBy: ['created_at', 'DESC'] 
    });
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving vacation requests', error });
  }
};

export const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status, comments } = req.body;
  try {
    const request = await VacationRequest.findByPk(id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    if (status) request.status = status;
    if (comments !== undefined) request.comments = comments;
    await request.save();
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: 'Error updating vacation request', error });
  }
};