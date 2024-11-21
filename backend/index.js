import express, { urlencoded } from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import connecttoDB from "./db.js";
import userRoute from "./routes/user.route.js"
import buyandcart from "./routes/buyandcart.controller.js"
import path from "path"
import plantRoute from "./routes/plant.route.js"
import dotenv from "dotenv";
dotenv.config({});

const app = express();

const PORT = 3001;

const __dirname = path.resolve()


console.log(__dirname)

// app.use(express.json());
// app.use(cookieParser());
// app.use(urlencoded({extended:true})); 

const corsOption = {
  origin:"https://plant-wpdb.vercel.app/",
  credentials:true,
}

// const corsOption = {
//   origin:"https://plant-wpdb.vercel.app/",
//   credentials:true,
// }

app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true})); 
 
app.get("/", (req, res) => {
  return res.status(200).json({
       mesaage: "i am coming from backend",
       success:true,
   })
})

app.use("/api/v1/users", userRoute);
app.use("/api/v1/plant", plantRoute)
app.use("/api/v1/buy_or_cart",buyandcart)

app.use(express.static(path.join(__dirname, "/frontend/dist")))

app.get("*", (req, res) => {

  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))

})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    connecttoDB()
  });
