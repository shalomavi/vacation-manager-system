import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import requestsRouter from './routes/requests.js';
import authRouter from './routes/authRoutes.js'
import dotenv from 'dotenv';

const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/requests', requestsRouter);
app.use('/api/login', authRouter)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
