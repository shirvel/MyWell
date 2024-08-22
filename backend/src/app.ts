
import express, { Express } from "express";
import mongoose from 'mongoose';
import env from "dotenv";
import bodyParser from 'body-parser';
import cors from "cors";
import authRoute from "./routes/auth_route";

import weekly_reflection_routers from "./routes/weekly_reflection_routers";
import meal_planner_routes from "./routes/meal_planner_route";
import workout_planner_routes from "./routes/workout_planner_route";
import userRoute from "./routes/user_routes";
import image_route from "./routes/image_route";
import meal_feedback_routes from "./routes/meal_feedback_routers";
import workout_feedback_routes from "./routes/workout_feedback_routers";
import generateImageRoute from './routes/generate_image_from_ai_route';
env.config();

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

      app.use("/api/weekly_reflection", weekly_reflection_routers);
      app.use("/api/meal-planner", meal_planner_routes);
      app.use("/api/workout-planner", workout_planner_routes);
      app.use("/meal_feedback", meal_feedback_routes);
      app.use("/workout_feedback", workout_feedback_routes);
      app.use("/user", userRoute);
      app.use("/auth", authRoute);
      app.use("/generate",generateImageRoute)
      app.use("/image", image_route);
      app.use("/uploads", express.static('uploads'))
      resolve(app);
    });
  });
  return promise;
};