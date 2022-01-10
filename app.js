import express from "express";

import moviesRoutes from "./routes/movies.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/movies", moviesRoutes);

app.get("/", (req, res) =>{
  res.send(
    `
  <h1 align="center" style="color:#0e0657; margin:30px;">Welcome to movies library server</h1>
  <p align="center" style="color:#3467eb;">Discover the whole list from <a href="http://localhost:3000/movies">here</a></p>
  `
  );
  console.log(res.body)}
 
);

export default app;
