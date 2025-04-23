import bodyParser from "body-parser";
import cors from "cors";
import express, { type Express, type Request, type Response } from "express";
import helmet from "helmet";
import http from "http";
import cookieParser from "cookie-parser";



import errorHandler from "./src/common/middleware/error-handler.middleware";
import {initDB} from "./src/common/services/database.services";
import { initPassport } from "./src/common/services/passport-jwt.services";
import routers from "./src/routes";
import { type IUser } from "./src/user/user.dto";
require('dotenv').config()

declare global {
    namespace Express {
      interface User extends Omit<IUser, "password"> { }
      interface Request {
        user?: User;
      }
    }
  }
  const port = Number(process.env.PORT) ?? 5000;

const app: Express = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, // This allows cookies and credentials to be sent
}));
app.use(helmet())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const initApp = async (): Promise<void> => {
    
    await initDB();
    
  
    
    initPassport();
  
    
    app.use("/api", routers);
  
    app.get("/", (req: Request, res: Response) => {
      res.send({ status: "ok" });
    });
  
    
    app.use(errorHandler);
    http.createServer(app).listen(port, () => {
      console.log("Server is runnuing on port", port);
    });
  };
  
  void initApp();
  