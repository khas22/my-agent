import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes'; // Import auth routes
import apiKeyRoutes from './routes/apiKeyRoutes'; // Import API key routes
import { trackUsage } from './middleware/usageMiddleware'; // Import usage middleware

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use usage tracking middleware for all routes after this point
app.use(trackUsage);

// Use auth routes
app.use('/api/auth', authRoutes);
// Use API key routes
app.use('/api/apikeys', apiKeyRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
