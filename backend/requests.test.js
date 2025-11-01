import request from 'supertest';
import app from './src/index'; // Adjust the path as necessary

describe('Vacation Requests API', () => {
  it('should create a new vacation request', async () => {
    const response = await request(app)
      .post('/api/requests')
      .send({
        user_id: 1,
        start_date: '2023-12-01',
        end_date: '2023-12-10',
        reason: 'Family vacation',
      });
    
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('status', 'Pending');
  });

  it('should retrieve all vacation requests', async () => {
    const response = await request(app)
      .get('/api/requests');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should approve a vacation request', async () => {
    const response = await request(app)
      .put('/api/requests/1/approve')
      .send({ comments: 'Approved for family vacation' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'Approved');
  });

  it('should reject a vacation request', async () => {
    const response = await request(app)
      .put('/api/requests/2/reject')
      .send({ comments: 'Not enough staff coverage' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'Rejected');
  });
});