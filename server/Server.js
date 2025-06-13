import express from "express";
import mission from "./routes/mission.js";
import path from "path";

const app = express();

// Middleware
app.use(express.json());

// FIRST define your API routes
app.use("/api", mission);

// THEN serve static files (React)
app.use(express.static(path.join(process.cwd(), "frontend", "public")));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
