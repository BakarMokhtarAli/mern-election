import cors from "cors";
import express from "express";
import globalErrorHandlingMiddleware from "./controllers/errorController.js";
import authRouter from "./routes/authRoutes.js";
import candidateRouter from "./routes/candidateRoutes.js";
import voteRouter from "./routes/voteRoutes.js";
import voterRouter from "./routes/voterRoutes.js";
import APPError from "./utils/APPError.js";

import path from "path";

const _dirname = path.resolve();

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "https://mern-election.onrender.com", // Origin saxda ah ee aad rabto inaad ka ogolaato
  // origin: "http://localhost:5173", // Origin saxda ah ee aad rabto inaad ka ogolaato
  credentials: true, // Hubi in credentials-ka la ogolaado
};

app.use(cors(corsOptions));

app.use("/api/v1/candidates", candidateRouter);
app.use("/api/v1/voters", voterRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/vote", voteRouter);
app.get("/test-error", (req, res, next) => {
  next(new APPError("Test error message", 403));
});

// under right routes important
app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "forntend", "dist", "index.html"));
});

console.log(path.join(_dirname, "/frontend/dist"));
console.log(path.join(_dirname, "frontend", "dist", "index.html"));

app.use("*", (req, res, next) => {
  const message = `Can't find this ${req.originalUrl} url on this server!`;
  next(new APPError(message, 404));
});
app.use(globalErrorHandlingMiddleware);
export default app;
