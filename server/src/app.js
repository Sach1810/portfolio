import express from "express";
import cors from "cors";
import { corsOptions } from "../config/corsOptions.js";

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

app.get("/health-check", (_, res) => res.send("ok"));
app.get("/", (_, res) => res.send("Server is running"));

export default app;
