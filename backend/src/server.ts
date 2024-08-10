import { initApp } from "./app";
import { Server } from "socket.io";
import http from "http";
import { scheduleWeeklyReflectionCronJob } from "./config/scheduler";

scheduleWeeklyReflectionCronJob();

initApp().then((app) => {
      console.log('development');
      const server = http.createServer(app);
      const io = new Server(server, {cors: {
        origin: '*',
      }});
   
      /* Start listening for both app requests and docket requests */
      const port = 3000
      server.listen(port, () => {
      console.log(`Listening on port ${port}`);
      }) 
});
