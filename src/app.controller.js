import connectDB from "./DB/connection.js";
import userRouter from "./modules/user/user.controller.js";
import messageRouter from "./modules/messages/messages.controller.js";
import authRouter from "./modules/auth/auth.controller.js";
import cors from "cors";
const bootstrap = async (app, express) => {
  await connectDB();
  app.use(express.json());
  app.use(cors());
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/message", messageRouter);

  app.get("*", (req, res) => {
    return next(new Error("route not found", { cause: 404 }));
  });
  app.use((err, req, res, next) => {
    // console.log(err.message);
    const status = err.cause || 500;
    return res.status(status).json({ message: err.message });
  });
};
export default bootstrap;
