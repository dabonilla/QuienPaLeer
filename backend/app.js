import cookieParser from "cookie-parser";
import express from "express";
import makeAuthRouter from "./routes/auth.js";
import cors from "cors";
import makeEventRouter from "./routes/event.js";
import bookRoute from "./routes/book.js"
import donationRoute from "./routes/donation.js";
import makeProfileRouter from "./routes/profile.js";

import makeConversationRouter from "./routes/conversation.js";
import makeMessageRouter from "./routes/message.js";
import usersRouter from "./routes/users.js";
import swapRoute from "./routes/swap.js";
import recommendationRoute from "./routes/recommendation.js";


const makeApp = (database) => {

    const app = express();

    // Middlewares iniciales
    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({ origin: true, credentials: true }));

    app.get('', (req, res) => {
        res.status(200).json({ message: "test" });
    });

    // Routers
    const authRouter = makeAuthRouter(database);
    app.use("/api/auth", authRouter);
    const eventRouter = makeEventRouter(database);
    app.use("/api/event", eventRouter);
    app.use("/api/book",bookRoute)
    app.use("/api/donation",donationRoute)
    const profileRouter = makeProfileRouter(database);
    app.use("/api/profile", profileRouter)
    app.use("/api/swap",swapRoute);
    const conversationRouter = makeConversationRouter(database);
    app.use('/api/chat/conversations', conversationRouter);
    const messageRouter = makeMessageRouter(database);
    app.use('/api/chat/messages', messageRouter);
    app.use('/api/users', usersRouter);    app.use("/api/recommendation",recommendationRoute);

    return app;
}

export default makeApp;
