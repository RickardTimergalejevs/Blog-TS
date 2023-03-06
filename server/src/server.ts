import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import userRouter from "./routes/user.route"
import postRouter from "./routes/post.route"
const app = express()

//Middlewares
app.use(express.json())
app.use(cors())

//Routes
app.use("/api/users", userRouter)
app.use("/api/posts", postRouter)

//Connect to DB
const initApp = () => {
    mongoose.set("strictQuery", false)
    mongoose.connect("mongodb://127.0.0.1:27017/blog")
    .then(() => console.log("Connected to DB"))
    .catch(() => console.log("Could not connect"))

    app.listen(3000, () => console.log("Server is up and running"))
}

initApp()