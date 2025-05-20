import express from "express";
import "dotenv/config";
import cors from "cors";

import registerRouter from "./routes/registerRoutes.js";
import loginRouter from "./routes/loginRoutes.js";
import usersRouter from "./routes/usersRoutes.js";

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(cors());

const apiRouter = express.Router();
apiRouter.use(registerRouter);
apiRouter.use(loginRouter);
apiRouter.use(usersRouter);
app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
