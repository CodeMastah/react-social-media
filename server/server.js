import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectToDB from './config/db.js';
import 'colors';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import errorHandler from './middlewares/errorMiddleware.js';

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(express.static('public'));

const PORT = process.env.PORT || 8000;

// Connecting to DB
connectToDB(() => {
  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Listening to Port ${process.env.PORT}`);
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error middleware
app.use(errorHandler);
