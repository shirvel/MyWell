import express from 'express';
import routes from './routes/example_routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use routes
app.use('/', routes);

export default app;
