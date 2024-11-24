import express from "express";
import cors from "cors";
import mouseRoutes from "./routes/mouseRoutes.js";

const app = express();
const PORT = process.env.PORT || 4001;

app.use(cors());
app.use(express.json());

app.use("/api/mouse", mouseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
