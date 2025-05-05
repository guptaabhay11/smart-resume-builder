"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const http_1 = __importDefault(require("http"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const fs_1 = __importDefault(require("fs"));
const error_handler_middleware_1 = __importDefault(require("./src/common/middleware/error-handler.middleware"));
const database_services_1 = require("./src/common/services/database.services");
const passport_jwt_services_1 = require("./src/common/services/passport-jwt.services");
const routes_1 = __importDefault(require("./src/routes"));
require('dotenv').config();
const userRoutes = JSON.parse(fs_1.default.readFileSync("./src/swagger/userRoutes.json", "utf8"));
const resumeRoutes = JSON.parse(fs_1.default.readFileSync("./src/swagger/resumeRoutes.json", "utf8"));
const swaggerDocument = Object.assign(Object.assign({}, userRoutes), { paths: Object.assign(Object.assign({}, userRoutes.paths), resumeRoutes.paths), components: Object.assign(Object.assign({}, userRoutes.components), resumeRoutes.components) });
const port = (_a = Number(process.env.PORT)) !== null && _a !== void 0 ? _a : 5000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:8080',
    credentials: true,
}));
app.use((0, helmet_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
const initApp = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, database_services_1.initDB)();
    (0, passport_jwt_services_1.initPassport)();
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
    app.use("/api", routes_1.default);
    app.get("/", (req, res) => {
        res.send({ status: "ok" });
    });
    app.use(error_handler_middleware_1.default);
    http_1.default.createServer(app).listen(port, () => {
        console.log("Server is runnuing on port", port);
    });
});
void initApp();
