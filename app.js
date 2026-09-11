const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

app.use("/files", express.static(path.join(__dirname, "uploads")));

const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
