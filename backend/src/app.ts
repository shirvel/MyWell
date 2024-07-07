import express, { Express } from "express";
import mongoose from 'mongoose';
import env from "dotenv";
import bodyParser from 'body-parser';
import cors from "cors";

env.config();

import weekly_reflection_routers from "./routes/weekly_reflection_routers";

export const initApp = (): Promise<Express> => {
  const promise = new Promise<Express>((resolve) => {
    mongoose.connect(process.env.DATABASE_URL);

    const db = mongoose.connection;
    db.on('error', (error) => {
      console.error('Connection error:', error);
    });

    db.once('open', () => {
      console.log('Connected to MongoDB');
      const app = express();
      app.use(cors());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use((req, res, next) => {
        console.log('Middleware Request Headers:', req.headers);
        console.log('Middleware Request Body:', req.body);
        next();
      });
      app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "*");
        next();
      });
      app.use("/api/weekly_reflection", weekly_reflection_routers);
      resolve(app);
    });
  });
  return promise;
};