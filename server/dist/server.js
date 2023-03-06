"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const post_route_1 = __importDefault(require("./routes/post.route"));
const app = (0, express_1.default)();
//Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//Routes
app.use("/api/users", user_route_1.default);
app.use("/api/posts", post_route_1.default);
//Connect to DB
const initApp = () => {
    mongoose_1.default.set("strictQuery", false);
    mongoose_1.default.connect("mongodb://127.0.0.1:27017/blog")
        .then(() => console.log("Connected to DB"))
        .catch(() => console.log("Could not connect"));
    app.listen(3000, () => console.log("Server is up and running"));
};
initApp();
