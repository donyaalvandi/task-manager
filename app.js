const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

app.use("/files", express.static(path.join(__dirname, "uploads")));

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

const { errorMiddleware } = require("./utils/errorHandler");
app.use(errorMiddleware);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
