
import express, { Express } from "express";
import mongoose from 'mongoose';
import env from "dotenv";
import bodyParser from 'body-parser';
import cors from "cors";
import authRoute from "./routes/auth_route";

env.config();

import weekly_reflection_routers from "./routes/weekly_reflection_routers";
import planner_routers from "./routes/meal_planner_route";
import userRoute from "./routes/user_routes";
import meal_feedback_routes from "./routes/meal_feedback_routers";

export const initApp = (): Promise<Express> => {
  const promise = new Promise<Express>((resolve) => {

    const db = mongoose.connection;
    db.on('error', (error) => {
      console.error('Connection error:', error);
    });

    db.once('open', () => console.log('Connected to mongo!'));
    const url = process.env.DATABASE_URL;
   
    mongoose.connect(url!).then(() => {
      console.log('Connected to MongoDB');
      const app = express();
      app.use(cors());
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      // app.use((req, res, next) => {
      //   console.log('Middleware Request Headers:', req.headers);
      //   console.log('Middleware Request Body:', req.body);
      //   next();
      // });
      app.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header("Access-Control-Allow-Credentials", "true");
        next();
      })

      app.use(bodyParser.json());
      app.use("/api/weekly_reflection", weekly_reflection_routers);
      app.use("/api/planner", planner_routers);
      app.use("/meal_feedback", meal_feedback_routes);
      app.use("/user", userRoute);
      app.use("/auth", authRoute);

      resolve(app);
    });
  });
  return promise;
};